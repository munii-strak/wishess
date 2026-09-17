export type ColorTheme = 'rose-cream' | 'midnight-luxury' | 'sunset-lilac' | 'emerald-gold';

export interface ThemeDefinition {
  id: ColorTheme;
  name: string;
  nameUrdu: string;
  description: string;
  swatches: string[];
  isDark: boolean;
  // Classes
  pageBg: string;
  pageText: string;
  headerBg: string;
  headerBorder: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardShadow: string;
  textHeading: string;
  textSub: string;
  textMuted: string;
  btnPrimary: string;
  btnSecondary: string;
  accentBadge: string;
  accentRing: string;
  navBarBg: string;
  glowEffect: string;
}

export const THEMES: Record<ColorTheme, ThemeDefinition> = {
  // 1. Soft Romantic Luxury (Cream, Blush Rose, Warm Champagne Gold) - Default
  'rose-cream': {
    id: 'rose-cream',
    name: 'Blush Rose & Champagne Cream',
    nameUrdu: 'گلابی اور سنہری کریم (Soft Romantic)',
    description: 'Soft warm ivory canvas with delicate rose petals and champagne gold glow',
    swatches: ['#fff9f5', '#f43f5e', '#f59e0b', '#4a1d24'],
    isDark: false,
    pageBg: 'bg-[#fffaf6]',
    pageText: 'text-[#3c1e24]',
    headerBg: 'bg-white/85 border-[#f3d9d4]',
    headerBorder: 'border-[#f3d9d4]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#fae3dd]',
    cardHoverBorder: 'hover:border-rose-400',
    cardShadow: 'shadow-xl shadow-rose-950/5',
    textHeading: 'text-[#471520]',
    textSub: 'text-[#6b313d]',
    textMuted: 'text-[#8f5562]',
    btnPrimary: 'bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white shadow-lg shadow-rose-900/20',
    btnSecondary: 'bg-[#fff0ed] hover:bg-[#ffe5e0] text-[#6e1e2d] border border-[#f5cfc6]',
    accentBadge: 'bg-[#ffe8e6] text-[#912038] border border-[#f7c2b8]',
    accentRing: 'ring-rose-400/40',
    navBarBg: 'bg-white/90 border-[#f3d9d4] shadow-rose-900/10',
    glowEffect: 'bg-rose-400/15',
  },

  // 2. Midnight Starlight & Rose Gold (Deep Romantic Luxury)
  'midnight-luxury': {
    id: 'midnight-luxury',
    name: 'Midnight Starlight & Rose Gold',
    nameUrdu: 'رات کا سحر اور روز گولڈ (Dark Velvet)',
    description: 'Deep nocturnal blue velvet with warm candlelight and glowing rose gold',
    swatches: ['#0b101b', '#f43f5e', '#fbbf24', '#f1f5f9'],
    isDark: true,
    pageBg: 'bg-[#0b101b]',
    pageText: 'text-[#f1f5f9]',
    headerBg: 'bg-[#0f172a]/85 border-[#1e293b]',
    headerBorder: 'border-[#1e293b]',
    cardBg: 'bg-[#121a2c]/90',
    cardBorder: 'border-[#1e293b]',
    cardHoverBorder: 'hover:border-rose-500/60',
    cardShadow: 'shadow-2xl shadow-black/60',
    textHeading: 'text-white',
    textSub: 'text-[#cbd5e1]',
    textMuted: 'text-[#94a3b8]',
    btnPrimary: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-950/60',
    btnSecondary: 'bg-[#1e293b] hover:bg-[#334155] text-white border border-[#334155]',
    accentBadge: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    accentRing: 'ring-rose-500/50',
    navBarBg: 'bg-[#0f172a]/90 border-[#1e293b] shadow-black/80',
    glowEffect: 'bg-rose-500/20',
  },

  // 3. Sunset Lilac & Golden Peach (Magical Fairy-tale)
  'sunset-lilac': {
    id: 'sunset-lilac',
    name: 'Sunset Peach & Radiant Lilac',
    nameUrdu: 'شام کی شفق اور پیاری جامنی (Dreamy Fairy-tale)',
    description: 'Dreamy sunset sky gradient with royal lavender, warm peach, and sweet berry tones',
    swatches: ['#faf5ff', '#a855f7', '#fb923c', '#3b0764'],
    isDark: false,
    pageBg: 'bg-[#faf5ff]',
    pageText: 'text-[#3b0764]',
    headerBg: 'bg-white/85 border-[#e9d5ff]',
    headerBorder: 'border-[#e9d5ff]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#ebd5ff]',
    cardHoverBorder: 'hover:border-purple-400',
    cardShadow: 'shadow-xl shadow-purple-950/5',
    textHeading: 'text-[#4c1d95]',
    textSub: 'text-[#6b21a8]',
    textMuted: 'text-[#86198f]',
    btnPrimary: 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white shadow-lg shadow-purple-900/20',
    btnSecondary: 'bg-[#f3e8ff] hover:bg-[#e9d5ff] text-[#581c87] border border-[#d8b4fe]',
    accentBadge: 'bg-[#f3e8ff] text-[#6b21a8] border border-[#d8b4fe]',
    accentRing: 'ring-purple-400/40',
    navBarBg: 'bg-white/90 border-[#e9d5ff] shadow-purple-900/10',
    glowEffect: 'bg-purple-400/15',
  },

  // 4. Royal Emerald & Pure Imperial Gold (Regal & Elegant)
  'emerald-gold': {
    id: 'emerald-gold',
    name: 'Royal Emerald & Imperial Gold',
    nameUrdu: 'شاہی زمرد اور خالص سونا (Regal Luxury)',
    description: 'Opulent royal emerald green velvet accented with antique warm gold filigree',
    swatches: ['#061712', '#d97706', '#f59e0b', '#ecfdf5'],
    isDark: true,
    pageBg: 'bg-[#061712]',
    pageText: 'text-[#ecfdf5]',
    headerBg: 'bg-[#0a231b]/85 border-[#133d2e]',
    headerBorder: 'border-[#133d2e]',
    cardBg: 'bg-[#0c2920]/90',
    cardBorder: 'border-[#174635]',
    cardHoverBorder: 'hover:border-amber-400/60',
    cardShadow: 'shadow-2xl shadow-black/70',
    textHeading: 'text-[#fef3c7]',
    textSub: 'text-[#a7f3d0]',
    textMuted: 'text-[#6ee7b7]',
    btnPrimary: 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-neutral-950 font-bold shadow-lg shadow-amber-950/60',
    btnSecondary: 'bg-[#133d2e] hover:bg-[#1a513d] text-[#fef3c7] border border-[#235e48]',
    accentBadge: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    accentRing: 'ring-amber-500/50',
    navBarBg: 'bg-[#0a231b]/90 border-[#133d2e] shadow-black/80',
    glowEffect: 'bg-amber-500/20',
  }
};
