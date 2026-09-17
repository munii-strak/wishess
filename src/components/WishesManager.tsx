import { useState, FormEvent } from 'react';
import { Heart, Plus, Trash2, Edit3, Sparkles, Check, Star, MessageSquareHeart, Send, RotateCcw } from 'lucide-react';
import { BirthdayWish } from '../types';
import { AI_WISH_TEMPLATES } from '../data/defaultData';
import { triggerHeartBurst } from '../utils/confetti';
import { musicBox } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface WishesManagerProps {
  wishes: BirthdayWish[];
  onAddWish: (wish: Omit<BirthdayWish, 'id' | 'createdAt'>) => void;
  onUpdateWish: (id: string, updated: Partial<BirthdayWish>) => void;
  onDeleteWish: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onResetDefaultWishes?: () => void;
}

export default function WishesManager({
  wishes,
  onAddWish,
  onUpdateWish,
  onDeleteWish,
  onToggleFavorite,
  onResetDefaultWishes,
}: WishesManagerProps) {
  const { theme } = useTheme();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingWishId, setEditingWishId] = useState<string | null>(null);

  // New wish form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newCategory, setNewCategory] = useState<BirthdayWish['category']>('romantic');

  // Edit wish form state
  const [editAuthor, setEditAuthor] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [editCategory, setEditCategory] = useState<BirthdayWish['category']>('romantic');

  const handleCreateWish = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onAddWish({
      author: newAuthor.trim() || 'From Your Secret Admirer ❤️',
      message: newMessage.trim(),
      category: newCategory,
      isFavorite: false,
    });

    setNewAuthor('');
    setNewMessage('');
    setIsAddingNew(false);
    triggerHeartBurst();
    musicBox.playPop();
  };

  const startEditing = (wish: BirthdayWish) => {
    setEditingWishId(wish.id);
    setEditAuthor(wish.author);
    setEditMessage(wish.message);
    setEditCategory(wish.category);
  };

  const saveEditing = (id: string) => {
    if (!editMessage.trim()) return;
    onUpdateWish(id, {
      author: editAuthor.trim() || 'From Your Heart ❤️',
      message: editMessage.trim(),
      category: editCategory,
    });
    setEditingWishId(null);
    musicBox.playPop();
  };

  const applyTemplate = (template: typeof AI_WISH_TEMPLATES[0]) => {
    setNewMessage(template.text);
    setNewCategory(template.category);
    setIsAddingNew(true);
    musicBox.playPop();
  };

  const getCategoryBadge = (cat: BirthdayWish['category']) => {
    switch (cat) {
      case 'romantic':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">Romantic ❤️</span>;
      case 'dua':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">Dua / Blessing ✨</span>;
      case 'sweet':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">Sweet 🌸</span>;
      case 'fun':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">Playful 🎈</span>;
    }
  };

  return (
    <section id="wishes-section" className="py-12 px-4 sm:px-6 relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.accentBadge} text-xs font-medium mb-1.5`}>
              <MessageSquareHeart className="w-3.5 h-3.5 text-rose-500" />
              <span>Personalized Wishes & Duas for Chotoo, Kuku & Natataklo</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold font-serif-display ${theme.textHeading}`}>
              Heartfelt Birthday Wishes for Chotoo & Kuku ({wishes.length})
            </h2>
            <p className={`text-xs sm:text-sm ${theme.textSub}`}>
              Romantic messages, sweet duas, and teasing wishes for Natataklo! Add your own or edit anytime.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onResetDefaultWishes && (
              <button
                type="button"
                onClick={onResetDefaultWishes}
                title="Restore all new Chotoo, Kuku & Natataklo wishes"
                className={`px-3 py-2.5 rounded-xl ${theme.btnSecondary} border text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Wishes</span>
              </button>
            )}
            <button
              id="add-custom-wish-btn"
              onClick={() => setIsAddingNew(!isAddingNew)}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl ${theme.btnPrimary} text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer`}
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingNew ? 'Close Form' : 'Write My Own Wish'}</span>
            </button>
          </div>
        </div>

        {/* AI Inspiration Template Chips */}
        <div className={`mb-6 p-4 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} ${theme.cardShadow}`}>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sweet & Teasing Ideas (Click to use)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AI_WISH_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => applyTemplate(tmpl)}
                className={`text-left p-2.5 rounded-xl ${theme.btnSecondary} border transition-all text-xs group cursor-pointer`}
              >
                <span className="font-semibold text-rose-500 block mb-0.5">
                  {tmpl.title}
                </span>
                <span className={`line-clamp-2 ${theme.textMuted}`}>
                  "{tmpl.text}"
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form: Add New Wish */}
        {isAddingNew && (
          <form
            onSubmit={handleCreateWish}
            className="mb-8 p-5 sm:p-6 rounded-2xl bg-neutral-900 border border-rose-500/40 shadow-xl shadow-rose-950/40 animate-fade-in"
          >
            <h3 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2 font-serif-display">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Write a Special Message for Chotoo</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Wish Message (Urdu, Roman Urdu, or English)
                </label>
                <textarea
                  required
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="e.g. Happy Birthday Chotoo! Allah tumhein dher saari khushiyan aur kamiyabi de. Hamesha aise hi muskuraate raho... ❤️"
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    From (Your Name / Romantic Nickname)
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. From Your Loving One ❤️"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as BirthdayWish['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="romantic">Romantic ❤️</option>
                    <option value="dua">Dua / Blessing ✨</option>
                    <option value="sweet">Sweet 🌸</option>
                    <option value="fun">Playful / Teasing 🎈</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-rose-900"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save Wish</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Wishes List */}
        <div className="space-y-4">
          {wishes.map((wish) => {
            const isEditing = editingWishId === wish.id;

            return (
              <div
                key={wish.id}
                id={`wish-card-${wish.id}`}
                className={`p-5 rounded-2xl border transition-all duration-200 relative group ${theme.cardShadow} ${
                  wish.isFavorite
                    ? `${theme.cardBg} border-rose-500/50`
                    : `${theme.cardBg} ${theme.cardBorder} ${theme.cardHoverBorder}`
                }`}
              >
                {isEditing ? (
                  // Inline Edit Mode
                  <div className="space-y-3">
                    <textarea
                      rows={3}
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <input
                        type="text"
                        value={editAuthor}
                        onChange={(e) => setEditAuthor(e.target.value)}
                        placeholder="Author name"
                        className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingWishId(null)}
                          className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEditing(wish.id)}
                          className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Normal View
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryBadge(wish.category)}
                        <span className="text-xs font-medium text-neutral-400">
                          {wish.author}
                        </span>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onToggleFavorite(wish.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            wish.isFavorite
                              ? 'text-amber-400 hover:text-amber-300'
                              : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                          title="Pin as favorite"
                        >
                          <Star className={`w-4 h-4 ${wish.isFavorite ? 'fill-amber-400' : ''}`} />
                        </button>

                        <button
                          onClick={() => startEditing(wish)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 transition-colors"
                          title="Edit wish"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteWish(wish.id)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 transition-colors"
                          title="Delete wish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal mb-3 whitespace-pre-wrap">
                      "{wish.message}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-800/80">
                      <span className="italic font-script text-rose-400 text-sm">Happy Birthday Chotoo</span>
                      <span>27 October</span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
