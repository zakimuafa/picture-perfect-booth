import React from 'react';
import { cn } from '@/lib/utils';
import { Frame, CameraFacing } from '@/types/photobooth';

interface CameraPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  frame: Frame;
  filter: string;
  facing: CameraFacing;
  className?: string;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  videoRef,
  frame,
  filter,
  facing,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-foreground/5',
        className
      )}
      style={{
        borderColor: frame.borderColor,
        borderWidth: frame.borderWidth,
        borderStyle: frame.borderStyle,
        borderRadius: frame.borderRadius,
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        style={{
          filter: filter,
          transform: facing === 'user' ? 'scaleX(-1)' : 'none',
        }}
      />
    </div>
  );
};
