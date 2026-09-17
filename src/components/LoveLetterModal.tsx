import { useState, useEffect } from 'react';
import { X, Heart, Sparkles, Feather, Check, Copy, RotateCcw, Share2, Send, MessageCircle } from 'lucide-react';
import { triggerHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audio';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DEFAULT_LONG_URDU_LETTER = `Mere Pyare Chotoo, Mere Sweet Kuku... Aur Haan, Mere Sab Se Cute Natataklo! 😜❤️

Sab se pehle to tumhein tumhari 27th October wali birthday bohat bohat mubarak ho! 🎂✨ Ek aur saal guzar gaya, tum thode aur bare ho gaye (lekin height ka mujhe abhi bhi thora sa doubt hai haha)! 😂

Suno mere Natataklo! Main kaafi din se soch rahi thi ke is saal tumhein birthday pe aisi kya cheez doon jo tumhein hamesha yaad rahe? Phir achanak mujhe ehsaas hua ke meri jaisi samajhdaar, pyari aur sabar karne wali larki tumhari zindagi mein maujood hai—batao bhala, is se bara tohfa poori dunya mein koi ho sakta hai? 😌 Tumhein to roz subah uth kar mera shukriya ada karna chahiye ke main tumhare itne nakhray, tumhara be-wajah ka gussa, aur tumhare ajeeb o ghareeb jokes itne pyaar se bardasht karti hoon! Sir pe baal thode kam ho jayein ya tum jitna marzi chote raho, mere liye tum hamesha wahi sab se cute Natataklo rahoge!

Lekin mazaaq ek taraf... agar dil ki gehraiyon se sach kahoon to Kuku, tum meri zindagi ka wo anmol hissa ho jiske baghair main apna ek din bhi adhoora mehsoos karti hoon. Jab tum muskuraate ho na, to aisa lagta hai meri dunya ki saari thakan aur saari tension ek pal mein gayab ho gayi. Tumhara wo bina kahe meri har baat samajh jana, mera har choti baat par khayal rakhna, aur jab main udaas hoon to ajeeb ajeeb baatein kar ke mujhe hasana—ye sab mere liye kisi naimat se kam nahi.

Log kehte hain waqt ke sath sab kuch badal jaata hai, lekin meri dua hai ke humara ye rishta, ye shararatein, aur ye be-panaah mohabbat har aane wale saal ke sath aur mazboot hoti jaye. Tum chahe jitne marzi bare ho jao ya burhay ho jao, mere dil ke liye tum hamesha wahi pyare se Chotoo aur masoom se Kuku rahoge.

Meri Allah Pak se dili dua hai ke tumhein dunya jahan ki khushiyan, sehat-mand lambi zindagi, aur aisi be-misaal kamiyabi naseeb kare ke tumhara har ek khwab poora ho jaye. Allah tumhein har buri nazar, har gham aur har dukh se hamesha apni hifazat aur rehamat mein rakhay. Ameen suma Ameen! 🤲✨

Ab aate hain sab se ahem aur serious baat par: Oye Natataklo! Aaj ke din koi bahana aur kanjoosi bilkul nahi chalegi! 🍰 Ek to zabardast sa chocolate cake cut hona chahiye, aur sath mein ek shandaar birthday treat lazmi hai! Warna dekh lena, agle poore saal tak tumhara official naam har jagah "Natataklo" hi pukara jayega! 🥳🎉

Happy Birthday once again, my heartbeat, my best friend, my sweetest Kuku! I love you more than words could ever explain. ❤️

Hamesha Sirf Tumhari,
Tumhari Jaan Chotoo Ke Liye 🌹`;

export const DEFAULT_SHORT_URDU_LETTER = `Happy Birthday mere pyare Chotoo, sweet Kuku, aur cute se Natataklo! 🎂❤️

Tum meri zindagi ka sab se khoobsurat hissa ho. Allah tumhein hamesha khush, tandrust aur kamiyab rakhay, aur tumhari har dili dua qabool farmaye. Ameen! 🤲✨

Aaj tumhara special din hai Natataklo, to treat aur cake dena bilkul mat bhoolna! 😜🍰 I love you to the moon and back, my Kuku! Hamesha aise hi muskuraate raho! 💖

With endless love,
Hamesha Tumhari 🌹`;

export default function LoveLetterModal({ isOpen, onClose }: LoveLetterModalProps) {
  const [activeTab, setActiveTab] = useState<'long' | 'short'>('long');
  const [letterContent, setLetterContent] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('chotoo_custom_love_letter_v2');
      if (saved) return saved;
    } catch (e) {
      console.warn('Could not read letter cache', e);
    }
    return DEFAULT_LONG_URDU_LETTER;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Switch between presets when user clicks tabs
  const handleSelectTab = (tab: 'long' | 'short') => {
    setActiveTab(tab);
    setIsEditing(false);
    const content = tab === 'long' ? DEFAULT_LONG_URDU_LETTER : DEFAULT_SHORT_URDU_LETTER;
    setLetterContent(content);
    try {
      localStorage.setItem('chotoo_custom_love_letter_v2', content);
    } catch {
      // ignore
    }
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    try {
      localStorage.setItem('chotoo_custom_love_letter_v2', letterContent);
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    const text = activeTab === 'long' ? DEFAULT_LONG_URDU_LETTER : DEFAULT_SHORT_URDU_LETTER;
    setLetterContent(text);
    setIsEditing(false);
    try {
      localStorage.setItem('chotoo_custom_love_letter_v2', text);
    } catch {
      // ignore
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letterContent);
      setIsCopied(true);
      musicBox.playPop();
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.warn('Copy failed', err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(letterContent);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#fdfbf7] text-neutral-900 rounded-3xl shadow-2xl p-5 sm:p-7 border-2 border-amber-200/90 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close letter"
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Envelope Wax Seal & Header */}
        <div className="text-center mb-3">
          <div className="w-11 h-11 mx-auto rounded-full bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-900/30 mb-2 border-2 border-rose-800">
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-[11px] font-serif-display font-medium">
            <Sparkles className="w-3 h-3 text-rose-600" />
            <span>Khas Birthday Letter for Chotoo • 27 October 2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-alex text-rose-950 mt-1">
            Kuku, Chotoo & Natataklo Special Letter ❤️
          </h2>
        </div>

        {/* Presets Toggle Bar: Long Teasing vs Short Simple */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-amber-50/80 p-1.5 rounded-2xl border border-amber-200/60 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1 bg-amber-100/70 p-0.5 rounded-xl text-xs font-medium">
            <button
              type="button"
              onClick={() => handleSelectTab('long')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-sans text-xs ${
                activeTab === 'long'
                  ? 'bg-rose-700 text-white shadow-sm font-semibold'
                  : 'text-neutral-700 hover:text-rose-900 hover:bg-amber-200/50'
              }`}
            >
              📜 Long & Teasing Letter (اردو)
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab('short')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-sans text-xs ${
                activeTab === 'short'
                  ? 'bg-rose-700 text-white shadow-sm font-semibold'
                  : 'text-neutral-700 hover:text-rose-900 hover:bg-amber-200/50'
              }`}
            >
              💌 Short & Simple (مختصر)
            </button>
          </div>

          {/* Quick Tools: Font Size, Reset */}
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="flex items-center bg-white/80 border border-amber-200 rounded-lg p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 rounded ${fontSize === 'sm' ? 'bg-rose-100 font-bold text-rose-800' : 'text-neutral-600'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('base')}
                className={`px-1.5 py-0.5 rounded ${fontSize === 'base' ? 'bg-rose-100 font-bold text-rose-800' : 'text-neutral-600'}`}
                title="Normal text"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 rounded ${fontSize === 'lg' ? 'bg-rose-100 font-bold text-rose-800' : 'text-neutral-600'}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 text-neutral-600 hover:text-rose-800 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
              title="Reset to original letter text"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Letter Body Parchment Container */}
        <div className="relative flex-1 overflow-y-auto bg-[#fffdf9] p-5 sm:p-6 rounded-2xl border border-amber-200/80 shadow-inner font-serif-display leading-relaxed">
          {isEditing ? (
            <textarea
              rows={13}
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              placeholder="Type your own heartfelt words for Chotoo / Kuku..."
              className="w-full bg-transparent border border-rose-300/60 rounded-xl p-3 text-neutral-900 text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none font-serif-display"
            />
          ) : (
            <div
              className={`text-neutral-800 whitespace-pre-wrap font-serif-display leading-relaxed tracking-wide ${
                fontSize === 'sm' ? 'text-xs sm:text-sm' : fontSize === 'lg' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
              }`}
            >
              {letterContent}
            </div>
          )}
        </div>

        {/* Action Controls Footer */}
        <div className="mt-4 pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isEditing) {
                  handleSaveEdit();
                } else {
                  setIsEditing(true);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 hover:bg-amber-100 text-xs font-medium text-rose-900 transition-colors cursor-pointer font-sans"
            >
              <Feather className="w-3.5 h-3.5 text-rose-700" />
              <span>{isEditing ? 'Save Changes' : 'Edit Text'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 hover:bg-amber-100 text-xs font-medium text-neutral-800 transition-colors cursor-pointer font-sans"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
              <span>{isCopied ? 'Copied! ❤️' : 'Copy Letter'}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer font-sans"
              title="Share directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          <button
            onClick={() => {
              triggerHeartBurst();
              musicBox.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-800 hover:to-pink-700 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-rose-900/20 transition-all font-sans cursor-pointer active:scale-95"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Keep in Heart ❤️</span>
          </button>
        </div>

      </div>
    </div>
  );
}

