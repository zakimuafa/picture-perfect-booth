import React, { useState, useRef } from 'react';
import { StickerData } from '@/types/photobooth';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StickerLayerProps {
  stickers: StickerData[];
  onUpdateSticker: (id: string, updates: Partial<StickerData>) => void;
  onRemoveSticker: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const StickerLayer: React.FC<StickerLayerProps> = ({
  stickers,
  onUpdateSticker,
  onRemoveSticker,
  containerRef,
}) => {
  const [activeSticker, setActiveSticker] = useState<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent, sticker: StickerData) => {
    e.preventDefault();
    setActiveSticker(sticker.id);
    dragStartRef.current = { x: e.clientX - sticker.x, y: e.clientY - sticker.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent, sticker: StickerData) => {
    if (activeSticker !== sticker.id || !dragStartRef.current || !containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(e.clientX - dragStartRef.current.x, container.width - 50));
    const newY = Math.max(0, Math.min(e.clientY - dragStartRef.current.y, container.height - 50));

    onUpdateSticker(sticker.id, { x: newX, y: newY });
  };

  const handlePointerUp = () => {
    setActiveSticker(null);
    dragStartRef.current = null;
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className={cn(
            'absolute cursor-move pointer-events-auto',
            'transition-shadow duration-200',
            activeSticker === sticker.id && 'z-20'
          )}
          style={{
            left: sticker.x,
            top: sticker.y,
            transform: `scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
            transformOrigin: 'center',
          }}
          onPointerDown={(e) => handlePointerDown(e, sticker)}
          onPointerMove={(e) => handlePointerMove(e, sticker)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <span className="text-5xl select-none">{sticker.emoji}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveSticker(sticker.id);
            }}
            className={cn(
              'absolute -top-2 -right-2 w-6 h-6 rounded-full',
              'bg-destructive text-destructive-foreground',
              'flex items-center justify-center',
              'opacity-0 hover:opacity-100 focus:opacity-100',
              'transition-opacity duration-200'
            )}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
