import { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle, Calendar, Sparkles, Heart } from 'lucide-react';
import { BirthdayWish } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: BirthdayWish[];
}

export default function ShareModal({ isOpen, onClose, wishes }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build the clean URL
  const currentUrl = window.location.origin + window.location.pathname;

  // Message for WhatsApp
  const shareMessage = `🎂 Happy Birthday Chotoo! ❤️✨\n\nI made a special personalized birthday surprise capsule with our memories, photo frames & sweet wishes for you!\n\n🎁 Open your surprise here:\n${currentUrl}\n\n(It unlocks on 27 October! ⏳)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(shareMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleDownloadCalendarInvite = () => {
    // Generate .ics calendar file for 27 Oct 2026
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Birthday Reminder//Chotoo Birthday//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:🎂 Happy Birthday Chotoo! Special Birthday Surprise
DESCRIPTION:The birthday surprise capsule is unlocked today! Open: ${currentUrl}
DTSTART:20261027T000000
DTEND:20261027T235959
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:🎂 Happy Birthday Chotoo! Surprise is now unlocked!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Chotoo_Birthday_27Oct_Reminder.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-rose-500/30 text-white rounded-3xl p-6 shadow-2xl">
        
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
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-white">
            Send Birthday Surprise to Chotoo
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            When Chotoo opens this link before 27 Oct, the surprise countdown lock screen will appear automatically!
          </p>
        </div>

        {/* Message Preview Box */}
        <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 mb-5 text-left text-xs text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed">
          {shareMessage}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {/* WhatsApp Direct */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send Directly via WhatsApp</span>
          </button>

          {/* Copy Link & Message */}
          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-950 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied Message & Link!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link & Message</span>
              </>
            )}
          </button>

          {/* Calendar Reminder */}
          <button
            onClick={handleDownloadCalendarInvite}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Download 27 Oct Calendar Reminder (.ics)</span>
          </button>
        </div>

        <div className="mt-5 text-center text-[11px] text-neutral-500 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>Locked securely until 27 October 2026</span>
        </div>

      </div>
    </div>
  );
}
