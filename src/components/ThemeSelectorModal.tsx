import { X, Check, Palette, Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ColorTheme } from '../types/theme';
import { triggerHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audio';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSelectorModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { currentTheme, setTheme, allThemes } = useTheme();

  if (!isOpen) return null;

  const handleSelect = (id: ColorTheme) => {
    setTheme(id);
    triggerHeartBurst();
    musicBox.playPop();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-rose-900/20 mb-3">
            <Palette className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display">
            Choose Color Combination
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Apni pasand ka khoobsurat color theme chunein
          </p>
        </div>

        {/* 4 Theme Cards */}
        <div className="space-y-3 mb-6">
          {allThemes.map((th) => {
            const isSelected = currentTheme === th.id;
            return (
              <div
                key={th.id}
                onClick={() => handleSelect(th.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 shadow-md scale-[1.01]'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950/40 hover:bg-neutral-50 dark:hover:bg-neutral-950'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Swatches preview circles */}
                  <div className="flex -space-x-1.5 flex-shrink-0">
                    {th.swatches.map((color, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 rounded-full border-2 border-white dark:border-neutral-900 shadow-xs"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold truncate">
                        {th.name}
                      </h4>
                      {th.isDark ? (
                        <span className="p-0.5 rounded bg-neutral-800 text-neutral-300">
                          <Moon className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="p-0.5 rounded bg-amber-100 text-amber-700">
                          <Sun className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-serif-display text-rose-600 dark:text-rose-400 mt-0.5">
                      {th.nameUrdu}
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {th.description}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {isSelected ? (
                    <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border-2 border-neutral-300 dark:border-neutral-700" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm shadow-md transition-all"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
}
