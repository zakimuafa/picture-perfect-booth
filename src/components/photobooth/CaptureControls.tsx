import React from 'react';
import { Camera, Video, RotateCcw, Timer, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CaptureMode, CountdownOption } from '@/types/photobooth';

interface CaptureControlsProps {
  mode: CaptureMode;
  countdown: CountdownOption;
  isRecording: boolean;
  recordingTime: number;
  hasMultipleCameras: boolean;
  onModeChange: (mode: CaptureMode) => void;
  onCountdownChange: (countdown: CountdownOption) => void;
  onCapture: () => void;
  onFlipCamera: () => void;
}

export const CaptureControls: React.FC<CaptureControlsProps> = ({
  mode,
  countdown,
  isRecording,
  recordingTime,
  hasMultipleCameras,
  onModeChange,
  onCountdownChange,
  onCapture,
  onFlipCamera,
}) => {
  const countdownOptions: CountdownOption[] = [0, 3, 5];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Mode Toggle */}
      <div className="flex gap-2 p-1 bg-muted rounded-2xl">
        <Button
          variant={mode === 'photo' ? 'cute' : 'ghost'}
          size="sm"
          onClick={() => onModeChange('photo')}
          className="gap-2"
        >
          <Camera className="w-4 h-4" />
          Photo
        </Button>
        <Button
          variant={mode === 'video' ? 'cute' : 'ghost'}
          size="sm"
          onClick={() => onModeChange('video')}
          className="gap-2"
        >
          <Video className="w-4 h-4" />
          Video
        </Button>
      </div>

      {/* Main Capture Area */}
      <div className="flex items-center gap-6">
        {/* Countdown Selector */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Timer</span>
          <div className="flex gap-1">
            {countdownOptions.map((option) => (
              <Button
                key={option}
                variant={countdown === option ? 'secondary' : 'ghost'}
                size="icon-sm"
                onClick={() => onCountdownChange(option)}
                className="w-8 h-8 rounded-full text-xs"
              >
                {option === 0 ? <Timer className="w-3 h-3" /> : `${option}s`}
              </Button>
            ))}
          </div>
        </div>

        {/* Capture Button */}
        <div className="relative">
          {isRecording && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              {recordingTime}s
            </div>
          )}
          <Button
            variant="capture"
            size="capture"
            onClick={onCapture}
            className={cn(
              'relative',
              isRecording && 'animate-pulse bg-destructive'
            )}
          >
            {mode === 'photo' ? (
              <Camera className="w-8 h-8" />
            ) : isRecording ? (
              <Square className="w-8 h-8" />
            ) : (
              <Video className="w-8 h-8" />
            )}
          </Button>
        </div>

        {/* Flip Camera */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Flip</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFlipCamera}
            disabled={!hasMultipleCameras}
            className="rounded-full"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
