import React from 'react';
import { Frame } from '@/types/photobooth';
import { frames } from '@/data/frames';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface FrameSelectorProps {
  selectedFrame: Frame;
  onSelectFrame: (frame: Frame) => void;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({
  selectedFrame,
  onSelectFrame,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground px-1">Frames</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 pb-2">
          {frames.map((frame) => (
            <button
              key={frame.id}
              onClick={() => onSelectFrame(frame)}
              className={cn(
                'flex-shrink-0 w-16 h-16 rounded-xl transition-all duration-200',
                'hover:scale-105 active:scale-95',
                selectedFrame.id === frame.id
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : 'ring-1 ring-border'
              )}
              style={{
                backgroundColor: frame.borderColor === 'transparent' ? '#f5f5f5' : frame.borderColor,
                borderRadius: Math.min(frame.borderRadius, 16),
              }}
            >
              <span className="text-xs font-medium text-foreground/70 mix-blend-difference">
                {frame.id === 'none' ? '✕' : ''}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
