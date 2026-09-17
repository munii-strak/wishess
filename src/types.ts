export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  date?: string;
  isCustom?: boolean;
  screenshotName?: string;
}

export interface BirthdayWish {
  id: string;
  author: string;
  message: string;
  category: 'romantic' | 'dua' | 'sweet' | 'fun';
  isFavorite?: boolean;
  createdAt: string;
}

export type FrameStyle = 
  | 'polaroid' 
  | 'golden-royal' 
  | 'floral-rose' 
  | 'neon-glow' 
  | 'vintage-film' 
  | 'wooden-plaque';

export type PhotoFilter = 'normal' | 'warm-golden' | 'vintage-rose' | 'monochrome' | 'dreamy-soft';

export interface FrameSticker {
  id: string;
  emoji: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  scale: number;
}

export interface FrameSettings {
  style: FrameStyle;
  filter: PhotoFilter;
  customCaption: string;
  dateStamp: string;
  stickers: FrameSticker[];
  rotation: number;
}
