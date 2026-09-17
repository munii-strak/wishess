import { useState, ChangeEvent } from 'react';
import { Sparkles, Heart, Camera, Gift, PartyPopper, ChevronRight, Upload } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { musicBox } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface HeroCelebrationProps {
  photos: MemoryPhoto[];
  onSelectPhotoForFrame: (photo: MemoryPhoto) => void;
  onUploadCustomPhoto: (photoIndex: number, dataUrl: string) => void;
  onOpenPhotoUploader: () => void;
  onOpenLetter: () => void;
  onScrollToWishes: () => void;
}

export default function HeroCelebration({
  photos,
  onSelectPhotoForFrame,
  onUploadCustomPhoto,
  onOpenPhotoUploader,
  onOpenLetter,
  onScrollToWishes,
}: HeroCelebrationProps) {
  const { theme } = useTheme();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const handleCelebrateClick = () => {
    triggerBirthdayConfetti();
    musicBox.playPop();
  };

  const handleFileUpload = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUploadCustomPhoto(idx, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="hero-celebration" className="relative pt-6 pb-12 px-4 sm:px-6 overflow-hidden transition-colors duration-500">
      {/* Background soft glow orbs */}
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] ${theme.glowEffect} rounded-full blur-3xl pointer-events-none -z-10`} />

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Animated pill badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.accentBadge} text-xs sm:text-sm font-medium mb-4 backdrop-blur-md`}>
          <PartyPopper className="w-4 h-4 text-rose-500" />
          <span>Special Birthday Celebration • 27 October</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Main Grand Birthday Title */}
        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold font-serif-display tracking-tight mb-3 leading-[1.15] ${theme.textHeading}`}>
          Happy Birthday, <br className="sm:hidden" />
          <span className="font-alex text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-amber-400 font-normal px-2">
            Chotoo!
          </span>
          <span className="text-rose-500 inline-block animate-bounce ml-1">❤️</span>
        </h1>

        {/* Sweet & Teasing Nickname Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-xs sm:text-sm">
          <span className={`px-3 py-1 rounded-full ${theme.accentBadge} font-medium`}>Sweetest Kuku 🌸</span>
          <span className={`px-3 py-1 rounded-full ${theme.accentBadge} font-medium`}>Forever Chotoo 💖</span>
          <span className={`px-3 py-1 rounded-full ${theme.accentBadge} font-medium`}>Cute Natataklo 😉🎂</span>
        </div>

        <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light leading-relaxed ${theme.textSub}`}>
          These pictures were taken with so much love, just like they were meant for this exact birthday moment. To my sweetest Kuku, Chotoo, and yes, my favorite Natataklo — you bring light and endless laughter to every day.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            id="celebrate-confetti-btn"
            onClick={handleCelebrateClick}
            className={`px-6 py-3 rounded-2xl ${theme.btnPrimary} font-semibold text-sm sm:text-base flex items-center gap-2 active:scale-95 transition-all cursor-pointer`}
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Send Birthday Love & Confetti 🎉</span>
          </button>

          <button
            id="open-sealed-letter-hero-btn"
            onClick={onOpenLetter}
            className={`px-5 py-3 rounded-2xl ${theme.btnSecondary} font-medium text-sm sm:text-base flex items-center gap-2 transition-colors active:scale-95 cursor-pointer`}
          >
            <Gift className="w-4 h-4 text-rose-500" />
            <span>Open Love Letter 💌</span>
          </button>
        </div>

        {/* 4 Feature Photos Showcase - Styled as Romantic Moments */}
        <div className="w-full">
          {/* Prominent Import Sent Photos Banner */}
          <div className={`mb-6 p-3.5 sm:p-4 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} ${theme.cardShadow} flex flex-col sm:flex-row items-center justify-between gap-3 text-left`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-500 flex-shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${theme.textHeading}`}>
                  <span>Want to load your exact 4 sent screenshots?</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-500 font-medium">1-Click Upload</span>
                </h4>
                <p className={`text-[11px] sm:text-xs mt-0.5 ${theme.textMuted}`}>
                  Upload your 4 screenshot files here to automatically replace all photo slots and custom frames!
                </p>
              </div>
            </div>
            <button
              onClick={onOpenPhotoUploader}
              className={`w-full sm:w-auto px-4 py-2 rounded-xl ${theme.btnPrimary} font-semibold text-xs flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 transition-all cursor-pointer`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Your 4 Photos</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-4 px-1">
            <div className="text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">Captured Moments</span>
              <h2 className={`text-lg sm:text-xl font-bold font-serif-display ${theme.textHeading}`}>
                Memories Taken For Chotoo's Birthday
              </h2>
            </div>
            <button
              onClick={onScrollToWishes}
              className="text-xs sm:text-sm text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <span>Personal Wishes</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {photos.map((photo, idx) => {
              const isSelected = activePhotoIdx === idx;
              return (
                <div
                  key={photo.id}
                  id={`photo-card-${idx}`}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`group relative rounded-2xl overflow-hidden ${theme.cardBg} border transition-all duration-300 flex flex-col text-left cursor-pointer ${theme.cardShadow} ${
                    isSelected
                      ? 'border-rose-500 scale-[1.02]'
                      : `${theme.cardBorder} ${theme.cardHoverBorder} hover:scale-[1.01]`
                  }`}
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80" />

                    {/* Date Badge or Custom Status */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-medium text-rose-200 border border-white/10 flex items-center gap-1 z-10">
                      {photo.isCustom ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-300 font-semibold">Your Real Photo</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span className="text-amber-200">Sample • Tap to Upload</span>
                        </>
                      )}
                    </div>

                    {/* Prominent Upload Center Button if not custom yet */}
                    {!photo.isCustom && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] transition-opacity group-hover:bg-black/30 z-10">
                        <label
                          htmlFor={`replace-photo-input-${idx}`}
                          onClick={(e) => e.stopPropagation()}
                          className={`px-3.5 py-2 rounded-xl ${theme.btnPrimary} font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-black/80 cursor-pointer active:scale-95 transition-all text-center`}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload {photo.screenshotName?.split(' ')[1] || 'Screenshot'}</span>
                          <input
                            id={`replace-photo-input-${idx}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(idx, e)}
                          />
                        </label>
                        <span className="mt-1.5 text-[10px] text-neutral-300 font-mono bg-black/70 px-2 py-0.5 rounded-md text-center truncate max-w-full">
                          {photo.screenshotName}
                        </span>
                      </div>
                    )}

                    {/* Upload / Replace Photo Button for custom photos */}
                    {photo.isCustom && (
                      <label
                        htmlFor={`replace-photo-input-${idx}`}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/70 hover:bg-rose-600 backdrop-blur-md text-white border border-white/20 cursor-pointer transition-colors z-10"
                        title="Change this photo"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <input
                          id={`replace-photo-input-${idx}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(idx, e)}
                        />
                      </label>
                    )}

                    {/* Frame Button overlay */}
                    <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPhotoForFrame(photo);
                        }}
                        className={`px-3 py-1.5 rounded-xl ${theme.btnPrimary} text-xs font-medium flex items-center gap-1.5 shadow-lg cursor-pointer`}
                      >
                        <Camera className="w-3 h-3" />
                        <span>Style in Frame</span>
                      </button>
                    </div>
                  </div>

                  {/* Caption & Title bottom */}
                  <div className="p-3.5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className={`text-sm font-semibold mb-1 font-serif-display ${theme.textHeading}`}>
                        {photo.title}
                      </h3>
                      <p className={`text-xs line-clamp-2 leading-relaxed ${theme.textMuted}`}>
                        {photo.caption}
                      </p>
                    </div>

                    <div className={`mt-3 pt-2 border-t ${theme.cardBorder} flex items-center justify-between text-[11px] ${theme.textMuted}`}>
                      <span className="italic font-script text-rose-500 text-sm">For Chotoo ❤️</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPhotoForFrame(photo);
                        }}
                        className="text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        Frame Studio &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
