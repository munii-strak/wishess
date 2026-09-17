import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorTheme, ThemeDefinition, THEMES } from '../types/theme';

interface ThemeContextType {
  currentTheme: ColorTheme;
  theme: ThemeDefinition;
  setTheme: (theme: ColorTheme) => void;
  allThemes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(() => {
    try {
      const saved = localStorage.getItem('chotoo_color_theme');
      if (saved && THEMES[saved as ColorTheme]) {
        return saved as ColorTheme;
      }
    } catch {
      // fallback
    }
    return 'rose-cream'; // Default to the breathtaking Soft Rose & Champagne Cream
  });

  const handleSetTheme = (newTheme: ColorTheme) => {
    setCurrentTheme(newTheme);
    try {
      localStorage.setItem('chotoo_color_theme', newTheme);
    } catch {
      // ignore
    }
  };

  const activeThemeDefinition = THEMES[currentTheme] || THEMES['rose-cream'];

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme: activeThemeDefinition,
        setTheme: handleSetTheme,
        allThemes: Object.values(THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
