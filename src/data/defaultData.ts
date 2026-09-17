import { BirthdayWish, MemoryPhoto } from '../types';
import photo1 from '../assets/images/chotoo_birthday_hero_1789472464993.jpg';
import photo2 from '../assets/images/chotoo_memory_two_1789472482618.jpg';
import photo3 from '../assets/images/chotoo_memory_three_1789472498812.jpg';
import photo4 from '../assets/images/chotoo_memory_four_1789472515530.jpg';

export const DEFAULT_PHOTOS: MemoryPhoto[] = [
  {
    id: 'photo-1',
    url: photo1,
    title: 'The Birthday Hero',
    caption: 'Every memory with you feels like poetry. Looking at this picture reminds me why you are my favorite person.',
    date: '27 Oct Memories',
    screenshotName: 'Screenshot 2026-09-15 163306.png',
  },
  {
    id: 'photo-2',
    url: photo2,
    title: 'Twin in Black',
    caption: 'When we both wore black and everything in the world felt peaceful just standing beside you.',
    date: 'Our Classic Look',
    screenshotName: 'Screenshot 2026-09-15 163412.png',
  },
  {
    id: 'photo-3',
    url: photo3,
    title: 'That Cap & Cute Smile',
    caption: 'Your playful smile in this cap is my absolute favorite. Stay happy and blessed always, Chotoo!',
    date: 'Pure Smiles',
    screenshotName: 'Screenshot 2026-09-15 163438.png',
  },
  {
    id: 'photo-4',
    url: photo4,
    title: 'My Forever Warmth',
    caption: 'Taken with so much love, captured just to celebrate you today and forever.',
    date: 'Special Bond',
    screenshotName: 'Screenshot 2026-09-15 163531.png',
  }
];

export const DEFAULT_WISHES: BirthdayWish[] = [
  {
    id: 'wish-1',
    author: 'Meri Jaan Kuku ❤️',
    message: 'Happy Birthday to my sweetest Chotoo, my adorable Kuku! 🎂💖 Tum meri zindagi ka sab se khoobsurat hissa ho. Tumhari ek smile meri saari thakan aur pareshani door kar deti hai. May Allah keep our love growing stronger forever. I love you endlessly, my Kuku!',
    category: 'romantic',
    isFavorite: true,
    createdAt: '2026-10-27'
  },
  {
    id: 'wish-2',
    author: 'Dil Ki Dua for Kuku ✨',
    message: 'Mere pyare Kuku, Allah Pak tumhein lambi, sehet-mand aur kamiyab tareen zindagi ata farmaye. Tumhari har dili muraad poori ho aur har subah nayi khushiyan laye. Hamesha muskuraate raho mere Chotoo, buri nazar se Allah hamesha mehfooz rakhay. Ameen suma Ameen! 🤲✨',
    category: 'dua',
    isFavorite: true,
    createdAt: '2026-10-27'
  },
  {
    id: 'wish-3',
    author: 'Teasing You Forever 😉',
    message: 'Suno mere Natataklo! 😜 Sir pe baal kam ho jayein ya height thori choti reh jaye, tum tab bhi mere sab se cute Natataklo hi rahoge! Happy Birthday to my favorite little trouble-maker! Aaj treat dena lazmi hai Natataklo warna no birthday cake! 🎂🎉😂',
    category: 'fun',
    isFavorite: true,
    createdAt: '2026-10-27'
  },
  {
    id: 'wish-4',
    author: 'Always Yours 🌹',
    message: 'Happy Birthday Kuku! ❤️ Chahe dunya idhar ki udhar ho jaye, tum hamesha mere pyare Chotoo rahoge. The way you care for me, listen to me, and make me laugh is pure magic. Thank you for being my constant support and safe heaven!',
    category: 'sweet',
    isFavorite: false,
    createdAt: '2026-10-27'
  },
  {
    id: 'wish-5',
    author: 'Natataklo Special Squad 🎈',
    message: 'Happy Birthday Natataklo! 🕺✨ Aaj pure din tumhara hukam chalega, lekin shart ye hai ke cake ka sab se bara piece mujhe milega! Zyada hero banne ki koshish mat karna Natataklo, mere samne tum wahi cute se Kuku ho! 🍰🥳',
    category: 'fun',
    isFavorite: false,
    createdAt: '2026-10-27'
  },
  {
    id: 'wish-6',
    author: 'Forever With Chotoo 💫',
    message: 'To my one and only Kuku: No matter how many birthdays pass, you will always be my precious Chotoo. 27th October is the most blessed day because my favorite person was born on this date. Wishing you a year as radiant and wonderful as your heart! 🌹❤️',
    category: 'romantic',
    isFavorite: true,
    createdAt: '2026-10-27'
  },
  {
    id: 'wish-7',
    author: 'Khas Dua & Pyaar 🤲',
    message: 'Dua hai ke is saal mere Kuku ko dunya jahan ki khushiyan milein, aur mere Natataklo ki thori si height aur thora sa sabar bhi barh jaye! 😉 Just kidding, Allah Pak tumhein har qadam par kamiyabi aur barkat de. Happy Birthday Chotoo! 💖✨',
    category: 'dua',
    isFavorite: false,
    createdAt: '2026-10-27'
  }
];

export const AI_WISH_TEMPLATES = [
  {
    title: 'Romantic Dua for Kuku',
    text: 'Happy Birthday mere pyare Kuku! ❤️ Allah tumhari zindagi ko noor aur khushiyon se bhar de. Hamesha mere dil ke paas rehna mere Chotoo! 🎂✨',
    category: 'dua' as const
  },
  {
    title: 'Teasing Natataklo Special',
    text: 'Happy Birthday mere Natataklo! 😜 Saal badal gaya par tumhari shararatein wahi hain. Happy Birthday to the cutest Natataklo in the universe! Treat kab de rahe ho Kuku? 🍰🎈',
    category: 'fun' as const
  },
  {
    title: 'Sweet Love for Chotoo & Kuku',
    text: 'To my dearest Kuku / Chotoo, you make every ordinary day extraordinary. Thank you for bringing so much warmth and laughter into my life. Love you forever! 💖',
    category: 'sweet' as const
  },
  {
    title: 'Deep Romance for Kuku',
    text: 'Happy Birthday to the keeper of my heart, my Kuku. 27 October is the day my blessing arrived. May your smile never fade, my Chotoo! 🌹✨',
    category: 'romantic' as const
  }
];

export const TARGET_BIRTHDAY = {
  month: 9, // 0-indexed: October is 9
  day: 27,
  year: 2026,
  hour: 0,
  minute: 0
};
