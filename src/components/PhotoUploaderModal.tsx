import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { X, Upload, Check, Image as ImageIcon, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { triggerBirthdayConfetti, triggerHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audio';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: MemoryPhoto[];
  onUpdatePhoto: (index: number, dataUrl: string) => void;
  onResetPhotos: () => void;
}

export default function PhotoUploaderModal({
  isOpen,
  onClose,
  photos,
  onUpdatePhoto,
  onResetPhotos,
}: PhotoUploaderModalProps) {
  const [dragOver, setDragOver] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const multipleInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Process multiple files dropped or selected
  const processFiles = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    let loadedCount = 0;
    validFiles.slice(0, 4).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onUpdatePhoto(idx, e.target.result as string);
          loadedCount++;
          if (loadedCount === Math.min(validFiles.length, 4)) {
            setSuccessMsg(`Successfully loaded ${loadedCount} photo(s)! They are now active in the frames & memories.`);
            triggerBirthdayConfetti();
            musicBox.playPop();
            setTimeout(() => setSuccessMsg(null), 4000);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleMultipleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleSingleSlotChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdatePhoto(index, event.target.result as string);
          triggerHeartBurst();
          musicBox.playPop();
          setSuccessMsg(`Slot ${index + 1} updated with your photo!`);
          setTimeout(() => setSuccessMsg(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const slotDescriptions = [
    { title: 'Slot 1: Close-up in Black Outfit', defaultLabel: 'Couple holding arm / Black embroidery' },
    { title: 'Slot 2: Mirror Selfie (Forehead Lean)', defaultLabel: 'Intimate mirror selfie with iPhone' },
    { title: 'Slot 3: Camo Cap & Cute Smile', defaultLabel: 'Boy in camo cap smiling warmly' },
    { title: 'Slot 4: Mirror Selfie Pose', defaultLabel: 'Standing together in front of mirror' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-rose-500/30 text-white rounded-3xl p-5 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-900/50 mb-3">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-white">
            Import Your 4 Sent Photos (Screenshots)
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mt-1 leading-relaxed">
            Select or drag & drop the 4 exact screenshots you sent. They will instantly appear in all birthday memories and custom photo frames!
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Dropzone for all 4 photos at once */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => multipleInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 mb-6 ${
            dragOver
              ? 'border-rose-400 bg-rose-500/15 scale-[1.01]'
              : 'border-neutral-700 hover:border-rose-500/50 bg-neutral-950/60 hover:bg-neutral-950'
          }`}
        >
          <input
            ref={multipleInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleMultipleChange}
          />
          <div className="w-10 h-10 mx-auto rounded-xl bg-neutral-800 flex items-center justify-center mb-2 text-rose-400">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-white">
            Click here to select all 4 screenshots, or drag & drop them here
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Supports PNG, JPG, WebP from your phone or PC
          </p>
        </div>

        {/* 4 Individual Slots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center gap-3 relative group"
            >
              <div className="w-16 h-20 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-700 flex-shrink-0 relative">
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {photo.isCustom && (
                  <div className="absolute top-1 left-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate">
                    {slotDescriptions[idx]?.title || `Photo ${idx + 1}`}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                  {slotDescriptions[idx]?.defaultLabel}
                </p>

                <label
                  htmlFor={`modal-slot-input-${idx}`}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-rose-400 hover:text-rose-300 cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>{photo.isCustom ? 'Change this photo' : 'Choose screenshot'}</span>
                  <input
                    id={`modal-slot-input-${idx}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleSingleSlotChange(idx, e)}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs">
          <button
            onClick={() => {
              onResetPhotos();
              setSuccessMsg('Reset to default photos.');
              setTimeout(() => setSuccessMsg(null), 3000);
            }}
            className="text-neutral-400 hover:text-neutral-200 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to default</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium shadow-md shadow-rose-950 transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
