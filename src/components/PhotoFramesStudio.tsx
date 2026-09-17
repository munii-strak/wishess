import { useState, useRef, useEffect } from 'react';
import { Camera, Download, Sparkles, Heart, RefreshCw, Type, Palette, Sliders, Image as ImageIcon, Upload } from 'lucide-react';
import { FrameStyle, PhotoFilter, MemoryPhoto } from '../types';
import { triggerHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface PhotoFramesStudioProps {
  photos: MemoryPhoto[];
  selectedPhoto: MemoryPhoto;
  onSelectPhoto: (photo: MemoryPhoto) => void;
  onOpenPhotoUploader: () => void;
}

export default function PhotoFramesStudio({
  photos,
  selectedPhoto,
  onSelectPhoto,
  onOpenPhotoUploader,
}: PhotoFramesStudioProps) {
  const { theme } = useTheme();
  const [activeFrame, setActiveFrame] = useState<FrameStyle>('polaroid');
  const [activeFilter, setActiveFilter] = useState<PhotoFilter>('warm-golden');
  const [caption, setCaption] = useState('Happy Birthday Chotoo! ❤️');
  const [subCaption, setSubCaption] = useState('27 October 2026 • Forever & Always');
  const [selectedStickers, setSelectedStickers] = useState<string[]>(['❤️', '🎂', '✨']);
  const [isExporting, setIsExporting] = useState(false);
  const frameContainerRef = useRef<HTMLDivElement>(null);

  const availableStickers = ['❤️', '🎂', '👑', '✨', '🎈', '🌹', '🥂', '💖', '🎉'];

  const frameOptions: { id: FrameStyle; name: string; desc: string }[] = [
    { id: 'polaroid', name: 'Vintage Polaroid', desc: 'Authentic retro instant print' },
    { id: 'golden-royal', name: 'Royal Gold Luxury', desc: 'Ornate metallic gold & sparkles' },
    { id: 'floral-rose', name: 'Romantic Rose', desc: 'Soft rose petals & warm garland' },
    { id: 'neon-glow', name: 'Neon Love Glow', desc: 'Vibrant luminous border' },
    { id: 'vintage-film', name: '35mm Filmstrip', desc: 'Classic cinema reel' },
    { id: 'wooden-plaque', name: 'Wooden Keepsake', desc: 'Warm mahogany with brass plaque' },
  ];

  const filterOptions: { id: PhotoFilter; name: string; filterClass: string }[] = [
    { id: 'normal', name: 'Original', filterClass: 'brightness-100 contrast-100' },
    { id: 'warm-golden', name: 'Golden Glow', filterClass: 'sepia-[0.25] saturate-125 contrast-105 brightness-105' },
    { id: 'vintage-rose', name: 'Rose Tint', filterClass: 'hue-rotate-[-10deg] saturate-110 brightness-105' },
    { id: 'monochrome', name: 'Classic B&W', filterClass: 'grayscale contrast-125' },
    { id: 'dreamy-soft', name: 'Dreamy', filterClass: 'contrast-95 brightness-110 saturate-110' },
  ];

  const toggleSticker = (sticker: string) => {
    if (selectedStickers.includes(sticker)) {
      setSelectedStickers(selectedStickers.filter((s) => s !== sticker));
    } else {
      setSelectedStickers([...selectedStickers, sticker]);
    }
  };

  // HTML5 Canvas Export for high-resolution PNG download
  const downloadFramedPhoto = async () => {
    setIsExporting(true);
    musicBox.playPop();
    triggerHeartBurst();

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = selectedPhoto.url;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const width = 1200;
      const height = 1500;
      canvas.width = width;
      canvas.height = height;

      // Draw frame background depending on style
      if (activeFrame === 'polaroid') {
        // Polaroid paper background
        ctx.fillStyle = '#fbfaf8';
        ctx.fillRect(0, 0, width, height);

        // Shadow behind frame
        ctx.fillStyle = '#f0ede6';
        ctx.fillRect(40, 40, width - 80, height - 80);

        // Draw image in polaroid cutout
        const imgX = 80;
        const imgY = 80;
        const imgW = width - 160;
        const imgH = height - 360;

        // Apply photo filter
        if (activeFilter === 'monochrome') {
          ctx.filter = 'grayscale(100%) contrast(120%)';
        } else if (activeFilter === 'warm-golden') {
          ctx.filter = 'sepia(30%) saturate(130%) brightness(105%)';
        } else if (activeFilter === 'vintage-rose') {
          ctx.filter = 'hue-rotate(-15deg) saturate(120%)';
        } else if (activeFilter === 'dreamy-soft') {
          ctx.filter = 'brightness(110%) contrast(95%)';
        }

        ctx.drawImage(img, imgX, imgY, imgW, imgH);
        ctx.filter = 'none';

        // Tape on top
        ctx.fillStyle = 'rgba(255, 235, 180, 0.7)';
        ctx.fillRect(width / 2 - 120, 20, 240, 50);

        // Handwritten caption
        ctx.fillStyle = '#1c1917';
        ctx.font = 'bold 58px "Alex Brush", cursive, serif';
        ctx.textAlign = 'center';
        ctx.fillText(caption, width / 2, height - 190);

        ctx.fillStyle = '#78716c';
        ctx.font = '32px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(subCaption, width / 2, height - 120);

      } else if (activeFrame === 'golden-royal') {
        // Dark velvet luxury background
        ctx.fillStyle = '#0a0908';
        ctx.fillRect(0, 0, width, height);

        // Gold border
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#f59e0b');
        gradient.addColorStop(0.3, '#fef08a');
        gradient.addColorStop(0.7, '#d97706');
        gradient.addColorStop(1, '#b45309');

        ctx.lineWidth = 40;
        ctx.strokeStyle = gradient;
        ctx.strokeRect(40, 40, width - 80, height - 80);

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#fef08a';
        ctx.strokeRect(70, 70, width - 140, height - 140);

        const imgX = 90;
        const imgY = 90;
        const imgW = width - 180;
        const imgH = height - 320;

        ctx.drawImage(img, imgX, imgY, imgW, imgH);

        // Golden Caption
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 54px "Playfair Display", serif';
        ctx.textAlign = 'center';
        ctx.fillText(caption, width / 2, height - 130);

        ctx.fillStyle = '#f59e0b';
        ctx.font = '28px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(subCaption, width / 2, height - 70);

      } else {
        // Elegant framed background for other styles
        ctx.fillStyle = '#171717';
        ctx.fillRect(0, 0, width, height);

        ctx.lineWidth = 30;
        ctx.strokeStyle = activeFrame === 'neon-glow' ? '#f43f5e' : '#fb7185';
        ctx.strokeRect(30, 30, width - 60, height - 60);

        const imgX = 70;
        const imgY = 70;
        const imgW = width - 140;
        const imgH = height - 280;

        ctx.drawImage(img, imgX, imgY, imgW, imgH);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 52px "Playfair Display", serif';
        ctx.textAlign = 'center';
        ctx.fillText(caption, width / 2, height - 110);

        ctx.fillStyle = '#fda4af';
        ctx.font = '30px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(subCaption, width / 2, height - 55);
      }

      // Draw stickers
      ctx.font = '60px serif';
      if (selectedStickers.includes('🎂')) ctx.fillText('🎂', 140, height - 120);
      if (selectedStickers.includes('❤️')) ctx.fillText('❤️', width - 180, height - 120);
      if (selectedStickers.includes('👑')) ctx.fillText('👑', width / 2, 100);
      if (selectedStickers.includes('✨')) ctx.fillText('✨', width - 140, 140);

      // Download file
      const link = document.createElement('a');
      link.download = `Chotoo_Birthday_Framed_Photo_27Oct.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error exporting photo frame:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const currentFilterObj = filterOptions.find((f) => f.id === activeFilter) || filterOptions[0];

  return (
    <section id="photo-frames-studio" className="py-12 px-4 sm:px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full ${theme.accentBadge} text-xs font-medium mb-2`}>
            <Camera className="w-3.5 h-3.5 text-rose-500" />
            <span>Interactive Custom Photo Frame Studio</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-bold font-serif-display mb-2 ${theme.textHeading}`}>
            Style Chotoo's Birthday Photo Frame
          </h2>
          <p className={`text-sm sm:text-base max-w-lg mx-auto ${theme.textSub}`}>
            Choose a frame style, filter, and romantic caption, then download your high-resolution birthday keepsake to send to Chotoo!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Left Column (5 cols) */}
          <div className={`lg:col-span-5 space-y-6 ${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl ${theme.cardShadow}`}>
            
            {/* 1. Pick Photo to Frame */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${theme.textHeading}`}>
                  <ImageIcon className="w-4 h-4 text-rose-500" />
                  <span>1. Select Photo</span>
                </label>
                <button
                  type="button"
                  onClick={onOpenPhotoUploader}
                  className="text-[11px] text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Import Sent Photos</span>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {photos.map((photo, i) => (
                  <button
                    key={photo.id}
                    onClick={() => onSelectPhoto(photo)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                      selectedPhoto.id === photo.id
                        ? 'border-rose-500 scale-105 shadow-md shadow-rose-900/50'
                        : 'border-neutral-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Frame Style */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2 mb-2.5">
                <Palette className="w-4 h-4 text-rose-400" />
                <span>2. Choose Frame Theme</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {frameOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveFrame(opt.id)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                      activeFrame === opt.id
                        ? 'bg-rose-950/40 border-rose-500 text-rose-200 shadow-sm'
                        : 'bg-neutral-800/60 border-neutral-700 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <span className="font-semibold block">{opt.name}</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Color Filter */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2 mb-2.5">
                <Sliders className="w-4 h-4 text-rose-400" />
                <span>3. Photo Mood Filter</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {filterOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      activeFilter === f.id
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-600'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Captions */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2 mb-2.5">
                <Type className="w-4 h-4 text-rose-400" />
                <span>4. Frame Caption & Date</span>
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Caption (e.g. Happy Birthday Chotoo! ❤️)"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                />
                <input
                  type="text"
                  value={subCaption}
                  onChange={(e) => setSubCaption(e.target.value)}
                  placeholder="Date / Subtitle (e.g. 27 October 2026)"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                />
                {/* Quick Nickname Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'Happy Birthday Chotoo! ❤️',
                    'My Sweet Kuku 🎂✨',
                    'Oye Natataklo! 😜🎉',
                    'Kuku Ki Birthday 🥳',
                    'Always Mine Natataklo 💖'
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCaption(preset)}
                      className="text-[10px] px-2 py-1 rounded-lg bg-neutral-800 hover:bg-rose-950/60 border border-neutral-700 hover:border-rose-500/50 text-neutral-300 hover:text-white transition-all cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Stickers */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>5. Birthday Stickers</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {availableStickers.map((s) => {
                  const isSelected = selectedStickers.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSticker(s)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-rose-600/30 border-rose-500 scale-110 shadow-sm'
                          : 'bg-neutral-800 border-neutral-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Download Button */}
            <button
              id="download-framed-photo-btn"
              onClick={downloadFramedPhoto}
              disabled={isExporting}
              className={`w-full py-3.5 px-4 rounded-xl ${theme.btnPrimary} font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all disabled:opacity-50`}
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating High-Res Frame...' : 'Download Framed Photo (PNG)'}</span>
            </button>
          </div>

          {/* Frame Preview Canvas Right Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="text-xs text-neutral-400 mb-2 flex items-center gap-1.5">
              <span>Live Frame Preview</span>
              <span className="text-rose-400">• High Quality Render</span>
            </div>

            {/* Responsive Frame Display Container */}
            <div
              ref={frameContainerRef}
              className="relative max-w-md w-full transition-all duration-300 select-none"
            >
              
              {/* Polaroid Style */}
              {activeFrame === 'polaroid' && (
                <div className="bg-[#fcfaf7] text-neutral-900 p-4 sm:p-6 pb-8 sm:pb-10 rounded-lg shadow-2xl shadow-black/80 border border-[#e5ded4] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  {/* Top tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-100/80 backdrop-blur-sm border border-amber-200/60 shadow-sm rotate-1 z-20 pointer-events-none" />

                  {/* Photo Frame */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 rounded-sm shadow-inner">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-all duration-300 ${currentFilterObj.filterClass}`}
                    />

                    {/* Stickers on photo */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 text-2xl drop-shadow-md">
                      {selectedStickers.map((s, i) => (
                        <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 200}ms` }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Handwritten text caption */}
                  <div className="mt-4 text-center">
                    <p className="font-alex text-3xl sm:text-4xl text-neutral-900 leading-tight">
                      {caption}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1 font-mono tracking-wide">
                      {subCaption}
                    </p>
                  </div>
                </div>
              )}

              {/* Golden Royal Luxury Style */}
              {activeFrame === 'golden-royal' && (
                <div className="relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-black p-4 sm:p-5 rounded-2xl border-4 border-amber-400 shadow-2xl shadow-amber-900/30">
                  <div className="absolute -top-4 -left-4 w-9 h-9 border-t-4 border-l-4 border-amber-300 rounded-tl-lg" />
                  <div className="absolute -top-4 -right-4 w-9 h-9 border-t-4 border-r-4 border-amber-300 rounded-tr-lg" />
                  <div className="absolute -bottom-4 -left-4 w-9 h-9 border-b-4 border-l-4 border-amber-300 rounded-bl-lg" />
                  <div className="absolute -bottom-4 -right-4 w-9 h-9 border-b-4 border-r-4 border-amber-300 rounded-br-lg" />

                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-amber-500/40 bg-neutral-950">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${currentFilterObj.filterClass}`}
                    />

                    {/* Royal Sparkles Badge */}
                    <div className="absolute top-3 left-3 bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 px-2.5 py-1 rounded-full text-xs flex items-center gap-1 font-serif-display">
                      <span>👑 Royal Birthday Edition</span>
                    </div>

                    <div className="absolute bottom-3 right-3 flex gap-1.5 text-2xl">
                      {selectedStickers.map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="font-serif-display font-bold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-100">
                      {caption}
                    </p>
                    <p className="text-xs text-amber-400/80 mt-1 uppercase tracking-widest font-mono">
                      {subCaption}
                    </p>
                  </div>
                </div>
              )}

              {/* Romantic Rose Garland Style */}
              {activeFrame === 'floral-rose' && (
                <div className="relative bg-neutral-950 p-4 sm:p-5 rounded-3xl border-2 border-rose-500/60 shadow-2xl shadow-rose-950/60">
                  {/* Decorative flower pins */}
                  <div className="absolute -top-3 -left-2 text-2xl">🌹</div>
                  <div className="absolute -top-3 -right-2 text-2xl">🌹</div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xl">✨ ❤️ ✨</div>

                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-rose-400/30">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${currentFilterObj.filterClass}`}
                    />
                    <div className="absolute inset-0 bg-rose-500/5 mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-2 right-2 flex flex-col gap-1 text-2xl">
                      {selectedStickers.map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="font-script text-3xl sm:text-4xl text-rose-300">
                      {caption}
                    </p>
                    <p className="text-xs text-rose-200/70 mt-0.5 font-light">
                      {subCaption}
                    </p>
                  </div>
                </div>
              )}

              {/* Neon Love Glow */}
              {activeFrame === 'neon-glow' && (
                <div className="relative bg-neutral-950 p-4 rounded-2xl border-2 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.5)]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-pink-500/40">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${currentFilterObj.filterClass}`}
                    />
                    <div className="absolute bottom-2 right-2 flex gap-1 text-2xl drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]">
                      {selectedStickers.map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-lg sm:text-xl font-bold text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] font-sans">
                      {caption}
                    </p>
                    <p className="text-xs text-pink-300/80 mt-0.5 tracking-wider">
                      {subCaption}
                    </p>
                  </div>
                </div>
              )}

              {/* 35mm Vintage Filmstrip */}
              {activeFrame === 'vintage-film' && (
                <div className="relative bg-neutral-950 p-3 sm:p-4 rounded-lg border border-neutral-800 shadow-2xl flex flex-col items-center">
                  {/* Film perforations top */}
                  <div className="w-full flex justify-between px-2 mb-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-3 h-4 rounded-sm bg-neutral-800 border border-neutral-700" />
                    ))}
                  </div>

                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${currentFilterObj.filterClass}`}
                    />
                    <div className="absolute bottom-2 left-2 text-amber-400 font-mono text-xs bg-black/70 px-1.5 py-0.5 rounded">
                      🎞️ 27.10.2026 #CHOTOO
                    </div>
                    <div className="absolute top-2 right-2 flex flex-col gap-1 text-xl">
                      {selectedStickers.map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Film perforations bottom */}
                  <div className="w-full flex justify-between px-2 mt-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-3 h-4 rounded-sm bg-neutral-800 border border-neutral-700" />
                    ))}
                  </div>

                  <div className="mt-2 text-center">
                    <p className="text-sm font-mono text-neutral-300 font-semibold">{caption}</p>
                  </div>
                </div>
              )}

              {/* Wooden Keepsake Plaque */}
              {activeFrame === 'wooden-plaque' && (
                <div className="relative bg-[#2e1d14] p-5 rounded-2xl border-8 border-[#452c1e] shadow-2xl">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border-2 border-[#5c3a28]">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${currentFilterObj.filterClass}`}
                    />
                    <div className="absolute top-2 right-2 flex gap-1 text-2xl">
                      {selectedStickers.map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Brass Plaque */}
                  <div className="mt-4 mx-auto max-w-xs bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700 p-2 rounded border border-yellow-300 shadow-md text-center text-neutral-950 font-serif-display">
                    <p className="font-bold text-sm sm:text-base leading-tight">{caption}</p>
                    <p className="text-[11px] font-sans font-medium text-neutral-900">{subCaption}</p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
