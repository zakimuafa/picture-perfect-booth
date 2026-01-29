import { useState, useEffect, useCallback } from 'react';
import { MediaItem } from '@/types/photobooth';

const PHOTOBOOTH_GALLERY_KEY = 'photobooth_gallery';
const PUBLIC_GALLERY_KEY = 'public_gallery';

export const useGallery = (galleryType: 'photobooth' | 'public') => {
  const storageKey = galleryType === 'photobooth' ? PHOTOBOOTH_GALLERY_KEY : PUBLIC_GALLERY_KEY;
  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setItems(parsed.map((item: MediaItem) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        })));
      } catch {
        setItems([]);
      }
    }
  }, [storageKey]);

  const saveItems = useCallback((newItems: MediaItem[]) => {
    localStorage.setItem(storageKey, JSON.stringify(newItems));
    setItems(newItems);
  }, [storageKey]);

  const addItem = useCallback((item: Omit<MediaItem, 'id' | 'createdAt'>) => {
    const newItem: MediaItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    const newItems = [newItem, ...items];
    saveItems(newItems);
    return newItem;
  }, [items, saveItems]);

  const removeItem = useCallback((id: string) => {
    const newItems = items.filter(item => item.id !== id);
    saveItems(newItems);
  }, [items, saveItems]);

  const clearAll = useCallback(() => {
    saveItems([]);
  }, [saveItems]);

  return {
    items,
    addItem,
    removeItem,
    clearAll,
  };
};
