import { useState } from 'react';
import { Heart, Volume2, VolumeX, Share2, Sparkles, Lock, Mail, Cake, Palette } from 'lucide-react';
import { musicBox } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface CelebrationHeaderProps {
  onOpenLetter: () => void;
  onOpenShare: () => void;
  onScrollToCake: () => void;
  onScrollToFrames: () => void;
  onScrollToWishes: () => void;
  onLockScreen: () => void;
  onOpenTheme: () => void;
  isPreviewMode: boolean;
}

export default function CelebrationHeader({
  onOpenLetter,
  onOpenShare,
  onScrollToCake,
  onScrollToFrames,
  onScrollToWishes,
  onLockScreen,
  onOpenTheme,
  isPreviewMode,
}: CelebrationHeaderProps) {
  const { theme } = useTheme();
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    const active = musicBox.toggle();
    setIsPlayingMusic(active);
  };

  return (
    <header id="celebration-header" className={`relative w-full border-b backdrop-blur-md sticky top-0 z-40 transition-colors duration-500 ${theme.headerBg} ${theme.headerBorder}`}>
      {/* Sender preview alert banner if in preview mode */}
      {isPreviewMode && (
        <div className={`border-b px-3 py-1.5 text-center text-xs font-medium flex items-center justify-center gap-2 ${theme.accentBadge}`}>
          <span>✨ <strong>Sender Preview Mode:</strong> You can edit wishes, customize photo frames, and test the surprise. Recipient link stays locked until 27 October!</span>
          <button
            onClick={onLockScreen}
            className="underline ml-2 text-xs font-bold cursor-pointer"
          >
            Switch to Lock Screen
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
        {/* Brand / Title Left */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 p-0.5 shadow-md shadow-rose-900/20 flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase font-semibold tracking-wider text-rose-500">27 October Special</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <h1 className={`text-base sm:text-lg font-bold tracking-tight flex items-center gap-1.5 font-serif-display ${theme.textHeading}`}>
              Happy Birthday Chotoo!
              <span className="text-rose-500">❤️</span>
            </h1>
          </div>
        </div>

        {/* Action Controls Right */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Button */}
          <button
            id="theme-switcher-header-btn"
            onClick={onOpenTheme}
            className={`px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${theme.btnSecondary}`}
            title="Change Color Theme"
          >
            <Palette className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">Color Theme</span>
          </button>

          {/* Audio toggle button */}
          <button
            id="toggle-music-btn"
            onClick={toggleMusic}
            aria-label="Toggle Birthday Melody"
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 border transition-all duration-200 cursor-pointer ${
              isPlayingMusic
                ? 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-300'
                : theme.btnSecondary
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
                <span className="hidden md:inline">Melody Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-neutral-400" />
                <span className="hidden md:inline">Melody</span>
              </>
            )}
          </button>

          {/* Love letter trigger */}
          <button
            id="open-letter-btn"
            onClick={onOpenLetter}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${theme.btnSecondary}`}
            title="Open Birthday Letter"
          >
            <Mail className="w-4 h-4 text-rose-500" />
            <span className="hidden md:inline">Letter</span>
          </button>

          {/* Cake button */}
          <button
            id="cake-nav-btn"
            onClick={onScrollToCake}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${theme.btnSecondary}`}
            title="Cut Cake"
          >
            <Cake className="w-4 h-4 text-amber-500" />
            <span className="hidden md:inline">Cake</span>
          </button>

          {/* Share Button */}
          <button
            id="share-header-btn"
            onClick={onOpenShare}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium ${theme.btnPrimary} flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer`}
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
