import React, { useState } from 'react';
import { stickers, stickerCategories } from '@/data/stickers';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Sticker } from '@/types/photobooth';

interface StickerPickerProps {
  onSelectSticker: (sticker: Sticker) => void;
}

export const StickerPicker: React.FC<StickerPickerProps> = ({
  onSelectSticker,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('emoji');

  const filteredStickers = stickers.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground px-1">Stickers</h3>
      
      {/* Category Tabs */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {stickerCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                'transition-all duration-200',
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Stickers Grid */}
      <div className="grid grid-cols-8 gap-2">
        {filteredStickers.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => onSelectSticker(sticker)}
            className={cn(
              'w-10 h-10 flex items-center justify-center text-2xl',
              'rounded-lg bg-muted hover:bg-secondary',
              'transition-all duration-200 hover:scale-110 active:scale-95'
            )}
          >
            {sticker.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
