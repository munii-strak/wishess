import { useState, useEffect } from 'react';
import { DEFAULT_PHOTOS, DEFAULT_WISHES, TARGET_BIRTHDAY } from './data/defaultData';
import { BirthdayWish, MemoryPhoto } from './types';
import CountdownLockScreen from './components/CountdownLockScreen';
import CelebrationHeader from './components/CelebrationHeader';
import HeroCelebration from './components/HeroCelebration';
import PhotoFramesStudio from './components/PhotoFramesStudio';
import WishesManager from './components/WishesManager';
import VirtualCakeCutting from './components/VirtualCakeCutting';
import LoveLetterModal from './components/LoveLetterModal';
import ShareModal from './components/ShareModal';
import PhotoUploaderModal from './components/PhotoUploaderModal';
import ThemeSelectorModal from './components/ThemeSelectorModal';
import { useTheme } from './context/ThemeContext';
import { savePhotoToStorage, getAllStoredPhotos, clearStoredPhotos } from './utils/photoStorage';
import { Heart, Sparkles, Lock, Unlock, Share2, Cake, Camera, MessageSquareHeart, Palette } from 'lucide-react';
import { triggerBirthdayConfetti } from './utils/confetti';

export default function App() {
  const { theme } = useTheme();

  // Photos state (initialized with defaults, then updated from IndexedDB)
  const [photos, setPhotos] = useState<MemoryPhoto[]>(DEFAULT_PHOTOS);

  // Selected photo for Custom Frame Studio
  const [selectedFramePhoto, setSelectedFramePhoto] = useState<MemoryPhoto>(DEFAULT_PHOTOS[0]);

  // Photo Uploader Modal state
  const [isPhotoUploaderOpen, setIsPhotoUploaderOpen] = useState(false);

  // Theme selector modal state
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Wishes state (persisted to localStorage)
  const [wishes, setWishes] = useState<BirthdayWish[]>(() => {
    try {
      const savedV2 = localStorage.getItem('chotoo_birthday_wishes_v2');
      if (savedV2) return JSON.parse(savedV2);

      const oldSaved = localStorage.getItem('chotoo_birthday_wishes');
      if (oldSaved) {
        const parsed = JSON.parse(oldSaved);
        // Keep any custom user-added wishes (which don't match initial wish-1..wish-4)
        const customWishes = parsed.filter((w: BirthdayWish) => !['wish-1', 'wish-2', 'wish-3', 'wish-4'].includes(w.id));
        return [...DEFAULT_WISHES, ...customWishes];
      }
    } catch {
      // fallback
    }
    return DEFAULT_WISHES;
  });

  // Load custom stored photos on mount
  useEffect(() => {
    async function loadStored() {
      try {
        const stored = await getAllStoredPhotos();
        if (Object.keys(stored).length > 0) {
          setPhotos((prev) =>
            prev.map((photo) => {
              if (stored[photo.id]) {
                return { ...photo, url: stored[photo.id], isCustom: true };
              }
              return photo;
            })
          );
        }
      } catch (err) {
        console.warn('Could not load stored photos:', err);
      }
    }
    loadStored();
  }, []);

  // Update selected frame photo when photos change
  useEffect(() => {
    const found = photos.find((p) => p.id === selectedFramePhoto.id);
    if (found) {
      setSelectedFramePhoto(found);
    } else if (photos.length > 0) {
      setSelectedFramePhoto(photos[0]);
    }
  }, [photos]);

  // Lock status check for 27 October
  const isDateReached = () => {
    const now = new Date();
    const targetDate = new Date(
      TARGET_BIRTHDAY.year,
      TARGET_BIRTHDAY.month,
      TARGET_BIRTHDAY.day,
      TARGET_BIRTHDAY.hour,
      TARGET_BIRTHDAY.minute,
      0
    );
    return now.getTime() >= targetDate.getTime();
  };

  // Preview Mode for the sender (to edit wishes and test before 27 Oct)
  const [isPreviewUnlocked, setIsPreviewUnlocked] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('preview') === 'true' || isDateReached();
  });

  // Modals state
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Sync wishes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chotoo_birthday_wishes_v2', JSON.stringify(wishes));
      localStorage.setItem('chotoo_birthday_wishes', JSON.stringify(wishes));
    } catch (err) {
      console.warn('Could not cache wishes', err);
    }
  }, [wishes]);

  // Trigger celebratory confetti on initial unlock
  useEffect(() => {
    if (isPreviewUnlocked || isDateReached()) {
      triggerBirthdayConfetti();
    }
  }, [isPreviewUnlocked]);

  // Wish handlers
  const handleAddWish = (newWishData: Omit<BirthdayWish, 'id' | 'createdAt'>) => {
    const newWish: BirthdayWish = {
      ...newWishData,
      id: `wish-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setWishes([newWish, ...wishes]);
  };

  const handleUpdateWish = (id: string, updated: Partial<BirthdayWish>) => {
    setWishes(wishes.map((w) => (w.id === id ? { ...w, ...updated } : w)));
  };

  const handleDeleteWish = (id: string) => {
    setWishes(wishes.filter((w) => w.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setWishes(
      wishes.map((w) => (w.id === id ? { ...w, isFavorite: !w.isFavorite } : w))
    );
  };

  const handleResetDefaultWishes = () => {
    setWishes(DEFAULT_WISHES);
    try {
      localStorage.setItem('chotoo_birthday_wishes_v2', JSON.stringify(DEFAULT_WISHES));
      localStorage.setItem('chotoo_birthday_wishes', JSON.stringify(DEFAULT_WISHES));
    } catch (err) {
      console.warn('Could not reset wishes in cache', err);
    }
  };

  // Replace photo handler
  const handleUploadCustomPhoto = async (idx: number, dataUrl: string) => {
    const targetPhoto = photos[idx];
    if (!targetPhoto) return;

    const updated = [...photos];
    updated[idx] = {
      ...targetPhoto,
      url: dataUrl,
      isCustom: true,
    };
    setPhotos(updated);

    // Persist to IndexedDB
    try {
      await savePhotoToStorage(targetPhoto.id, dataUrl);
    } catch (e) {
      console.error('Failed to persist photo', e);
    }
  };

  // Reset photos to default
  const handleResetPhotos = async () => {
    await clearStoredPhotos();
    setPhotos(DEFAULT_PHOTOS);
    setSelectedFramePhoto(DEFAULT_PHOTOS[0]);
  };

  // Window drag & drop state
  const [isWindowDragging, setIsWindowDragging] = useState(false);

  // Global drag and drop handler
  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer?.types.includes('Files')) {
        setIsWindowDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        setIsWindowDragging(false);
        dragCounter = 0;
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      dragCounter = 0;
      setIsWindowDragging(false);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
        if (files.length === 0) return;

        files.slice(0, 4).forEach((file, idx) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              handleUploadCustomPhoto(idx, event.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        });

        triggerBirthdayConfetti();
      }
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [photos]);

  // Scroll helpers
  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If locked and not in preview mode, render the countdown lock vault
  const naturallyUnlocked = isDateReached();
  const showCelebration = naturallyUnlocked || isPreviewUnlocked;

  if (!showCelebration) {
    return (
      <main className={`min-h-screen transition-colors duration-500 ${theme.pageBg} ${theme.pageText} selection:bg-rose-500/30`}>
        <CountdownLockScreen
          onUnlockPreview={() => setIsPreviewUnlocked(true)}
          onShare={() => setIsShareOpen(true)}
          onOpenPhotoUploader={() => setIsPhotoUploaderOpen(true)}
          onOpenTheme={() => setIsThemeModalOpen(true)}
          onOpenLetter={() => setIsLetterOpen(true)}
        />
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          wishes={wishes}
        />
        <PhotoUploaderModal
          isOpen={isPhotoUploaderOpen}
          onClose={() => setIsPhotoUploaderOpen(false)}
          photos={photos}
          onUpdatePhoto={handleUploadCustomPhoto}
          onResetPhotos={handleResetPhotos}
        />
        <ThemeSelectorModal
          isOpen={isThemeModalOpen}
          onClose={() => setIsThemeModalOpen(false)}
        />
        <LoveLetterModal
          isOpen={isLetterOpen}
          onClose={() => setIsLetterOpen(false)}
        />
        {isWindowDragging && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center border-4 border-dashed border-rose-500 animate-fade-in pointer-events-none">
            <div className="w-20 h-20 rounded-3xl bg-rose-600/30 border border-rose-400 flex items-center justify-center text-rose-400 mb-4 animate-bounce">
              <Camera className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-white mb-2">
              Drop Your 4 Screenshots Here!
            </h3>
            <p className="text-sm text-rose-300 max-w-md">
              Release your screenshot files (Screenshot 2026-09-15 163306.png etc.) to instantly set them as Chotoo's birthday photos!
            </p>
          </div>
        )}
      </main>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 selection:bg-rose-500/30 ${theme.pageBg} ${theme.pageText}`}>
      
      {/* Sticky Header */}
      <CelebrationHeader
        onOpenLetter={() => setIsLetterOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onScrollToCake={() => scrollTo('cake-cutting-section')}
        onScrollToFrames={() => scrollTo('photo-frames-studio')}
        onScrollToWishes={() => scrollTo('wishes-section')}
        onLockScreen={() => setIsPreviewUnlocked(false)}
        onOpenTheme={() => setIsThemeModalOpen(true)}
        isPreviewMode={!naturallyUnlocked && isPreviewUnlocked}
      />

      <main className="flex-grow">
        {/* 1. Hero Celebration Section with 4 Couple Photos */}
        <HeroCelebration
          photos={photos}
          onSelectPhotoForFrame={(photo) => {
            setSelectedFramePhoto(photo);
            scrollTo('photo-frames-studio');
          }}
          onUploadCustomPhoto={handleUploadCustomPhoto}
          onOpenPhotoUploader={() => setIsPhotoUploaderOpen(true)}
          onOpenLetter={() => setIsLetterOpen(true)}
          onScrollToWishes={() => scrollTo('wishes-section')}
        />

        {/* 2. Custom Photo Frame Studio Feature */}
        <PhotoFramesStudio
          photos={photos}
          selectedPhoto={selectedFramePhoto}
          onSelectPhoto={(photo) => setSelectedFramePhoto(photo)}
          onOpenPhotoUploader={() => setIsPhotoUploaderOpen(true)}
        />

        {/* 3. Wishes Manager - Interactive Add/Edit Wishes */}
        <WishesManager
          wishes={wishes}
          onAddWish={handleAddWish}
          onUpdateWish={handleUpdateWish}
          onDeleteWish={handleDeleteWish}
          onToggleFavorite={handleToggleFavorite}
          onResetDefaultWishes={handleResetDefaultWishes}
        />

        {/* 4. Interactive Virtual Cake Cutting Ceremony */}
        <VirtualCakeCutting />
      </main>

      {/* Floating Bottom Navigation Bar for Mobile / Quick Access */}
      <nav aria-label="Quick actions" className="sticky bottom-3 z-30 max-w-md mx-auto px-4 w-full">
        <div className={`${theme.navBarBg} border ${theme.cardBorder} backdrop-blur-lg rounded-2xl p-2 flex items-center justify-around shadow-2xl`}>
          <button
            onClick={() => scrollTo('hero-celebration')}
            className={`flex flex-col items-center gap-1 text-[11px] ${theme.textMuted} hover:text-rose-500 p-1.5 transition-colors cursor-pointer`}
          >
            <Heart className="w-4 h-4" />
            <span>Memories</span>
          </button>

          <button
            onClick={() => scrollTo('photo-frames-studio')}
            className={`flex flex-col items-center gap-1 text-[11px] ${theme.textMuted} hover:text-rose-500 p-1.5 transition-colors cursor-pointer`}
          >
            <Camera className="w-4 h-4" />
            <span>Frames</span>
          </button>

          <button
            onClick={() => scrollTo('wishes-section')}
            className={`flex flex-col items-center gap-1 text-[11px] ${theme.textMuted} hover:text-rose-500 p-1.5 transition-colors cursor-pointer`}
          >
            <MessageSquareHeart className="w-4 h-4" />
            <span>Wishes</span>
          </button>

          <button
            onClick={() => scrollTo('cake-cutting-section')}
            className={`flex flex-col items-center gap-1 text-[11px] ${theme.textMuted} hover:text-amber-500 p-1.5 transition-colors cursor-pointer`}
          >
            <Cake className="w-4 h-4" />
            <span>Cake</span>
          </button>

          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="flex flex-col items-center gap-1 text-[11px] text-rose-500 hover:text-rose-600 p-1.5 transition-colors font-medium cursor-pointer"
            title="Change color combination"
          >
            <Palette className="w-4 h-4" />
            <span>Colors</span>
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            className={`flex flex-col items-center gap-1 text-[11px] ${theme.textMuted} hover:text-rose-500 p-1.5 transition-colors font-medium cursor-pointer`}
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <footer className={`py-8 px-4 text-center text-xs ${theme.textMuted} border-t ${theme.cardBorder}`}>
        <p className="flex items-center justify-center gap-1.5 font-script text-lg text-rose-500 mb-1">
          Made with boundless love for Chotoo ❤️
        </p>
        <p>A Special Birthday Keepsake • Opening Automatically on 27 October 2026</p>
        {!naturallyUnlocked && (
          <div className="mt-3">
            <button
              onClick={() => setIsPreviewUnlocked(!isPreviewUnlocked)}
              className={`inline-flex items-center gap-1.5 text-xs ${theme.textMuted} hover:underline cursor-pointer`}
            >
              {isPreviewUnlocked ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock preview and show 27 Oct countdown vault</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlock preview mode</span>
                </>
              )}
            </button>
          </div>
        )}
      </footer>

      {/* Modals */}
      <LoveLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        wishes={wishes}
      />

      <PhotoUploaderModal
        isOpen={isPhotoUploaderOpen}
        onClose={() => setIsPhotoUploaderOpen(false)}
        photos={photos}
        onUpdatePhoto={handleUploadCustomPhoto}
        onResetPhotos={handleResetPhotos}
      />

      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />

      {/* Global Drag & Drop Overlay */}
      {isWindowDragging && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center border-4 border-dashed border-rose-500 animate-fade-in pointer-events-none">
          <div className="w-20 h-20 rounded-3xl bg-rose-600/30 border border-rose-400 flex items-center justify-center text-rose-400 mb-4 animate-bounce">
            <Camera className="w-10 h-10" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-white mb-2">
            Drop Your 4 Screenshots Here!
          </h3>
          <p className="text-sm text-rose-300 max-w-md">
            Release your screenshot files (Screenshot 2026-09-15 163306.png etc.) to instantly set them as Chotoo's birthday photos!
          </p>
        </div>
      )}

    </div>
  );
}

