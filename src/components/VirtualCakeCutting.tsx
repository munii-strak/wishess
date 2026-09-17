import { useState } from 'react';
import { Cake, Sparkles, Flame, Scissors, RotateCcw, Heart } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { musicBox } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export default function VirtualCakeCutting() {
  const { theme } = useTheme();
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [cutCount, setCutCount] = useState(0);

  const handleBlowCandles = () => {
    setCandlesLit(false);
    musicBox.playPop();
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setIsCut(false);
    musicBox.playPop();
  };

  const handleCutCake = () => {
    setIsCut(true);
    setCutCount((c) => c + 1);
    triggerBirthdayConfetti();
    musicBox.playPop();
  };

  return (
    <section id="cake-cutting-section" className="py-12 px-4 sm:px-6 transition-colors duration-500 text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.accentBadge} text-xs font-medium mb-2`}>
          <Cake className="w-3.5 h-3.5 text-amber-500" />
          <span>Virtual Birthday Celebration</span>
        </div>
        <h2 className={`text-2xl sm:text-4xl font-bold font-serif-display mb-1 ${theme.textHeading}`}>
          Cut the Cake for Chotoo! 🎂
        </h2>
        <p className={`text-xs sm:text-sm max-w-sm mb-8 ${theme.textSub}`}>
          Make a wish, blow the candles, and slice the birthday cake together!
        </p>

        {/* Cake Illustration Stage */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex flex-col items-center justify-end mb-6 select-none">
          
          {/* Candle Flames */}
          <div className="absolute top-12 z-20 flex gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {candlesLit ? (
                  <div className="relative">
                    <div className="w-3.5 h-5 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full blur-[1px] animate-pulse" />
                    <div className="absolute -inset-1 bg-yellow-400/40 rounded-full blur-sm" />
                  </div>
                ) : (
                  <div className="w-1 h-3 bg-neutral-600 rounded-full opacity-60" />
                )}
                {/* Candle Stick */}
                <div className="w-2.5 h-10 bg-gradient-to-b from-pink-400 via-rose-300 to-pink-500 rounded-t-sm shadow-sm" />
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="relative w-36 h-16 bg-gradient-to-b from-rose-200 via-pink-100 to-rose-200 rounded-t-3xl border-2 border-rose-300 shadow-md flex items-center justify-center z-10">
            {/* Frosting drips */}
            <div className="absolute -bottom-1 inset-x-2 flex justify-between">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="w-3 h-3 bg-rose-200 rounded-full" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-rose-900 uppercase tracking-widest font-mono">
              Chotoo
            </span>
          </div>

          {/* Cake Bottom Tier */}
          <div className={`relative w-56 h-24 bg-gradient-to-b from-[#3d2314] via-[#52301c] to-[#2c180d] rounded-t-2xl border-2 border-amber-900/60 shadow-2xl flex items-center justify-center transition-all duration-500 ${
            isCut ? 'translate-x-1' : ''
          }`}>
            {/* Cream ribbon */}
            <div className="w-full h-3 bg-rose-300/80 my-auto shadow-inner" />

            {/* Cut line indicator */}
            {isCut && (
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            )}
          </div>

          {/* Cake Plate */}
          <div className="w-64 sm:w-72 h-4 bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400 rounded-full shadow-2xl border border-neutral-300" />
        </div>

        {/* Celebration State Message */}
        {isCut && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-pink-950/40 to-neutral-900 border border-rose-500/40 shadow-xl max-w-sm animate-fade-in">
            <p className="text-sm font-bold text-rose-300 mb-1 flex items-center justify-center gap-1.5 font-serif-display">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Happy Birthday Sweet Chotoo!</span>
            </p>
            <p className="text-xs text-neutral-300">
              Cake slice served with infinite love and sweet wishes on 27th October! May life give you all the happiness you bring to others. 🍰✨
            </p>
          </div>
        )}

        {/* Interactive Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {candlesLit ? (
            <button
              id="blow-candles-btn"
              onClick={handleBlowCandles}
              className={`px-4 py-2.5 rounded-xl ${theme.btnSecondary} border text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer`}
            >
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Blow the Candles 💨</span>
            </button>
          ) : (
            <button
              id="relight-candles-btn"
              onClick={handleRelight}
              className={`px-4 py-2.5 rounded-xl ${theme.btnSecondary} border text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer`}
            >
              <RotateCcw className="w-4 h-4 text-amber-500" />
              <span>Light Candles Again ✨</span>
            </button>
          )}

          <button
            id="cut-cake-btn"
            onClick={handleCutCake}
            className={`px-5 py-2.5 rounded-xl ${theme.btnPrimary} font-semibold text-xs sm:text-sm flex items-center gap-2 active:scale-95 transition-all cursor-pointer`}
          >
            <Scissors className="w-4 h-4" />
            <span>{isCut ? `Cut Another Slice! (${cutCount})` : 'Cut Birthday Cake 🍰'}</span>
          </button>
        </div>

      </div>
    </section>
  );
}
