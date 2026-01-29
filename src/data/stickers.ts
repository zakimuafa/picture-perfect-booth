import { Sticker } from '@/types/photobooth';

export const stickers: Sticker[] = [
  // Emoji
  { id: 'smile', emoji: '😊', category: 'emoji' },
  { id: 'laugh', emoji: '😂', category: 'emoji' },
  { id: 'wink', emoji: '😉', category: 'emoji' },
  { id: 'cool', emoji: '😎', category: 'emoji' },
  { id: 'star-eyes', emoji: '🤩', category: 'emoji' },
  { id: 'kiss', emoji: '😘', category: 'emoji' },
  { id: 'tongue', emoji: '😜', category: 'emoji' },
  { id: 'party', emoji: '🥳', category: 'emoji' },
  
  // Animals
  { id: 'cat', emoji: '🐱', category: 'animals' },
  { id: 'dog', emoji: '🐶', category: 'animals' },
  { id: 'bunny', emoji: '🐰', category: 'animals' },
  { id: 'bear', emoji: '🐻', category: 'animals' },
  { id: 'panda', emoji: '🐼', category: 'animals' },
  { id: 'fox', emoji: '🦊', category: 'animals' },
  { id: 'unicorn', emoji: '🦄', category: 'animals' },
  { id: 'butterfly', emoji: '🦋', category: 'animals' },
  
  // Love & Hearts
  { id: 'heart-red', emoji: '❤️', category: 'love' },
  { id: 'heart-pink', emoji: '💕', category: 'love' },
  { id: 'heart-sparkle', emoji: '💖', category: 'love' },
  { id: 'heart-eyes', emoji: '😍', category: 'love' },
  { id: 'kiss-heart', emoji: '💋', category: 'love' },
  { id: 'cupid', emoji: '💘', category: 'love' },
  { id: 'rose', emoji: '🌹', category: 'love' },
  { id: 'ring', emoji: '💍', category: 'love' },
  
  // Fun Text
  { id: 'star', emoji: '⭐', category: 'text' },
  { id: 'sparkles', emoji: '✨', category: 'text' },
  { id: 'fire', emoji: '🔥', category: 'text' },
  { id: 'rainbow', emoji: '🌈', category: 'text' },
  { id: 'crown', emoji: '👑', category: 'text' },
  { id: 'diamond', emoji: '💎', category: 'text' },
  { id: 'boom', emoji: '💥', category: 'text' },
  { id: 'clap', emoji: '👏', category: 'text' },
  
  // Fun
  { id: 'sunglasses', emoji: '🕶️', category: 'fun' },
  { id: 'balloon', emoji: '🎈', category: 'fun' },
  { id: 'confetti', emoji: '🎉', category: 'fun' },
  { id: 'gift', emoji: '🎁', category: 'fun' },
  { id: 'camera', emoji: '📸', category: 'fun' },
  { id: 'peace', emoji: '✌️', category: 'fun' },
  { id: 'thumbsup', emoji: '👍', category: 'fun' },
  { id: 'muscle', emoji: '💪', category: 'fun' },
];

export const stickerCategories = [
  { id: 'emoji', name: 'Emoji', icon: '😊' },
  { id: 'animals', name: 'Animals', icon: '🐱' },
  { id: 'love', name: 'Love', icon: '❤️' },
  { id: 'text', name: 'Text', icon: '✨' },
  { id: 'fun', name: 'Fun', icon: '🎉' },
];
