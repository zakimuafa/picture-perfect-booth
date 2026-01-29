import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Frame, StickerData } from '@/types/photobooth';
import { StickerLayer } from './StickerLayer';
import { Download, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoPreviewProps {
  imageUrl: string;
  frame: Frame;
  filter: string;
  stickers: StickerData[];
  onUpdateSticker: (id: string, updates: Partial<StickerData>) => void;
  onRemoveSticker: (id: string) => void;
  onSave: () => void;
  onDiscard: () => void;
  onDownload: () => void;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({
  imageUrl,
  frame,
  filter,
  stickers,
  onUpdateSticker,
  onRemoveSticker,
  onSave,
  onDiscard,
  onDownload,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={containerRef}
        className="relative overflow-hidden animate-scale-in"
        style={{
          borderColor: frame.borderColor,
          borderWidth: frame.borderWidth,
          borderStyle: frame.borderStyle,
          borderRadius: frame.borderRadius,
        }}
      >
        <img
          src={imageUrl}
          alt="Captured photo"
          className="max-w-full max-h-[60vh] object-contain"
          style={{ filter }}
        />
        <StickerLayer
          stickers={stickers}
          onUpdateSticker={onUpdateSticker}
          onRemoveSticker={onRemoveSticker}
          containerRef={containerRef}
        />
      </div>

      <div className="flex gap-3">
        <Button
          variant="destructive"
          onClick={onDiscard}
          className="gap-2"
        >
          <X className="w-4 h-4" />
          Discard
        </Button>
        <Button
          variant="secondary"
          onClick={onDownload}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          variant="cute"
          onClick={onSave}
          className="gap-2"
        >
          <Check className="w-4 h-4" />
          Save to Gallery
        </Button>
      </div>
    </div>
  );
};
