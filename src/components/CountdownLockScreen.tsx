import { useState, useEffect } from 'react';
import { Lock, Clock, Sparkles, Heart, Share2, Eye, Gift, Calendar, Camera, Palette, Mail } from 'lucide-react';
import { TARGET_BIRTHDAY } from '../data/defaultData';
import { useTheme } from '../context/ThemeContext';

interface CountdownLockScreenProps {
  onUnlockPreview: () => void;
  onShare: () => void;
  onOpenPhotoUploader?: () => void;
  onOpenTheme?: () => void;
  onOpenLetter?: () => void;
}

export default function CountdownLockScreen({
  onUnlockPreview,
  onShare,
  onOpenPhotoUploader,
  onOpenTheme,
  onOpenLetter,
}: CountdownLockScreenProps) {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      // Target is Oct 27, 2026 00:00:00
      let targetDate = new Date(TARGET_BIRTHDAY.year, TARGET_BIRTHDAY.month, TARGET_BIRTHDAY.day, TARGET_BIRTHDAY.hour, TARGET_BIRTHDAY.minute, 0);

      // If already passed for the current year, target next year if applicable
      if (now.getTime() > targetDate.getTime() && now.getMonth() > TARGET_BIRTHDAY.month) {
        targetDate = new Date(now.getFullYear() + 1, TARGET_BIRTHDAY.month, TARGET_BIRTHDAY.day, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="countdown-vault" className={`min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden transition-colors duration-500 ${theme.pageBg} ${theme.pageText}`}>
      {/* Subtle ambient light orbs */}
      <div className={`absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none ${theme.glowEffect}`} />
      <div className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none ${theme.glowEffect}`} />

      {/* Main Vault Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Floating Theme Switcher pill */}
        {onOpenTheme && (
          <button
            onClick={onOpenTheme}
            className={`mb-5 px-4 py-1.5 rounded-full text-xs font-medium border flex items-center gap-2 shadow-sm transition-all hover:scale-105 cursor-pointer ${theme.btnSecondary}`}
          >
            <Palette className="w-3.5 h-3.5 text-rose-500" />
            <span>Theme: <strong>{theme.name}</strong> • Tap to change colors</span>
          </button>
        )}

        {/* Glowing Padlock Icon Badge */}
        <div className="relative mb-5">
          <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} flex items-center justify-center ${theme.cardShadow} relative group`}>
            <div className={`absolute inset-0 rounded-3xl ${theme.glowEffect} blur-xl opacity-60 animate-pulse-glow`} />
            <Lock className="w-11 h-11 sm:w-13 sm:h-13 text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]" />
            
            {/* Heart accent */}
            <div className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1.5 shadow-lg">
              <Heart className="w-4 h-4 fill-white text-white animate-bounce" />
            </div>
          </div>
        </div>

        {/* Header Tag */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.accentBadge} text-xs sm:text-sm font-medium mb-3 backdrop-blur-sm`}>
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Special Birthday Vault for Chotoo (Kuku)</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        </div>

        {/* Title */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-serif-display tracking-tight mb-2 leading-tight ${theme.textHeading}`}>
          Surprise Locked Until <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-amber-400">27 October</span>
        </h1>

        <p className={`text-sm sm:text-base max-w-md mx-auto mb-7 leading-relaxed font-light ${theme.textSub}`}>
          A personalized birthday treasure prepared with sweet love, photo frames, and customized wishes for Chotoo. The vault will open automatically on your special day!
        </p>

        {/* Countdown Timer Grid */}
        <div id="countdown-timer-display" className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-md mb-7">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-3 sm:p-4 backdrop-blur-md ${theme.cardShadow} flex flex-col items-center justify-center group ${theme.cardHoverBorder} transition-all duration-300`}
            >
              <span className={`text-2xl sm:text-4xl font-extrabold font-mono tracking-tight drop-shadow-sm ${theme.textHeading}`}>
                {String(item.value).padStart(2, '0')}
              </span>
              <span className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold mt-1 ${theme.textMuted}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Vault Teasers */}
        <div className={`w-full ${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-4 sm:p-5 mb-7 backdrop-blur-sm text-left ${theme.cardShadow}`}>
          <h2 className={`text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2 ${theme.textMuted}`}>
            <Gift className="w-4 h-4 text-rose-500" />
            Inside this locked surprise for Chotoo & Kuku:
          </h2>
          <ul className={`space-y-2.5 text-xs sm:text-sm ${theme.textSub}`}>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Personalized <strong className="text-rose-600 dark:text-rose-300">"Happy Birthday Chotoo"</strong> title, heartfelt duas & teasing Natataklo wishes</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>4 Cherished couple photos in <strong className="text-amber-600 dark:text-amber-300">Custom Photo Frames</strong></span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              <span>Interactive <strong className="text-pink-600 dark:text-pink-300">Cake Cutting Ceremony</strong> & romantic music chime</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>Secret sealed love letter capsule for Chotoo & Natataklo</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <button
            id="share-lock-link-btn"
            onClick={onShare}
            className={`w-full py-3 px-5 rounded-xl ${theme.btnPrimary} font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200 cursor-pointer`}
          >
            <Share2 className="w-4 h-4" />
            <span>Send / Share Link with Chotoo</span>
          </button>

          <button
            id="preview-creator-mode-btn"
            onClick={onUnlockPreview}
            className={`w-full sm:w-auto py-3 px-5 rounded-xl ${theme.btnSecondary} font-medium text-sm flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98] transition-all duration-200 cursor-pointer`}
            title="Preview how Chotoo will see it on Oct 27, and customize wishes"
          >
            <Eye className="w-4 h-4 text-rose-500" />
            <span>Preview Celebration</span>
          </button>
        </div>

        {onOpenLetter && (
          <div className="mt-3 w-full max-w-md">
            <button
              id="lockscreen-open-letter-btn"
              type="button"
              onClick={onOpenLetter}
              className={`w-full py-2.5 px-4 rounded-xl ${theme.btnSecondary} border font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer`}
            >
              <Mail className="w-4 h-4 text-rose-500" />
              <span>Read Love Letter (Urdu • Teasing & Sweet)</span>
            </button>
          </div>
        )}

        {onOpenPhotoUploader && (
          <div className={`mt-5 w-full max-w-md p-3.5 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} ${theme.cardShadow} text-center`}>
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-300 mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Use Your 4 Exact Screenshots</span>
            </p>
            <button
              onClick={onOpenPhotoUploader}
              className={`w-full py-2.5 px-4 rounded-xl ${theme.btnPrimary} text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer`}
            >
              <Camera className="w-4 h-4" />
              <span>Click to Import Screenshots (163306, 163412, etc.)</span>
            </button>
            <p className={`text-[10px] mt-1.5 ${theme.textMuted}`}>
              Upload your 4 screenshot files to show your exact photos in all cards & frames
            </p>
          </div>
        )}

        {/* Small sender footnote */}
        <div className={`mt-6 flex items-center gap-2 text-xs ${theme.textMuted}`}>
          <Calendar className="w-3.5 h-3.5 text-rose-500" />
          <span>Locked for Chotoo • Auto-unlocks on 27 October 2026</span>
        </div>

      </div>
    </div>
  );
}
