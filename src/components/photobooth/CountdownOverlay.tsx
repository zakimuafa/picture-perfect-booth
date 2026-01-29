import React from 'react';
import { cn } from '@/lib/utils';

interface CountdownOverlayProps {
  count: number;
  isVisible: boolean;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
  count,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 backdrop-blur-sm z-20">
      <div
        className={cn(
          'w-32 h-32 rounded-full gradient-candy flex items-center justify-center',
          'animate-scale-in shadow-float'
        )}
      >
        <span className="text-6xl font-display font-bold text-primary-foreground">
          {count}
        </span>
      </div>
    </div>
  );
};
