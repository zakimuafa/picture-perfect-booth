import React, { useState, useCallback, useRef } from 'react';
import { useCamera } from '@/hooks/useCamera';
import { useMediaRecorder } from '@/hooks/useMediaRecorder';
import { useGallery } from '@/hooks/useGallery';
import { CameraPreview } from '@/components/photobooth/CameraPreview';
import { CountdownOverlay } from '@/components/photobooth/CountdownOverlay';
import { CaptureControls } from '@/components/photobooth/CaptureControls';
import { EditorPanel } from '@/components/photobooth/EditorPanel';
import { PhotoPreview } from '@/components/photobooth/PhotoPreview';
import { StickerLayer } from '@/components/photobooth/StickerLayer';
import { Button } from '@/components/ui/button';
import { frames } from '@/data/frames';
import { filters } from '@/data/filters';
import { Frame, Filter, Sticker, StickerData, CaptureMode, CountdownOption } from '@/types/photobooth';
import { Camera as CameraIcon, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';

const Photobooth: React.FC = () => {
  const {
    videoRef,
    isActive,
    facing,
    error,
    hasMultipleCameras,
    startCamera,
    stopCamera,
    flipCamera,
    capturePhoto,
  } = useCamera();

  const { isRecording, recordingTime, startRecording, stopRecording } = useMediaRecorder(videoRef);
  const { addItem } = useGallery('photobooth');

  const [mode, setMode] = useState<CaptureMode>('photo');
  const [countdown, setCountdown] = useState<CountdownOption>(3);
  const [countdownValue, setCountdownValue] = useState<number>(0);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const [selectedFrame, setSelectedFrame] = useState<Frame>(frames[0]);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(filters[0]);
  const [stickers, setStickers] = useState<StickerData[]>([]);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedVideo, setCapturedVideo] = useState<string | null>(null);

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const addSticker = useCallback((sticker: Sticker) => {
    const newSticker: StickerData = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      emoji: sticker.emoji,
      x: Math.random() * 100 + 50,
      y: Math.random() * 100 + 50,
      scale: 1,
      rotation: 0,
    };
    setStickers((prev) => [...prev, newSticker]);
  }, []);

  const updateSticker = useCallback((id: string, updates: Partial<StickerData>) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  }, []);

  const removeSticker = useCallback((id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handleCapture = useCallback(async () => {
    if (mode === 'photo') {
      if (countdown > 0) {
        setIsCountingDown(true);
        setCountdownValue(countdown);

        for (let i = countdown; i > 0; i--) {
          setCountdownValue(i);
          await new Promise((r) => setTimeout(r, 1000));
        }

        setIsCountingDown(false);
      }

      const photo = capturePhoto();
      if (photo) {
        setCapturedImage(photo);
      }
    } else {
      if (isRecording) {
        const videoUrl = await stopRecording();
        if (videoUrl) {
          setCapturedVideo(videoUrl);
        }
      } else {
        if (countdown > 0) {
          setIsCountingDown(true);
          setCountdownValue(countdown);

          for (let i = countdown; i > 0; i--) {
            setCountdownValue(i);
            await new Promise((r) => setTimeout(r, 1000));
          }

          setIsCountingDown(false);
        }

        startRecording(15);
      }
    }
  }, [mode, countdown, isRecording, capturePhoto, startRecording, stopRecording]);

  const handleSave = useCallback(() => {
    if (capturedImage) {
      addItem({
        type: 'photo',
        dataUrl: capturedImage,
        frame: selectedFrame.id,
        filter: selectedFilter.id,
        stickers: stickers,
      });
      setCapturedImage(null);
      setStickers([]);
    } else if (capturedVideo) {
      addItem({
        type: 'video',
        dataUrl: capturedVideo,
        frame: selectedFrame.id,
        filter: selectedFilter.id,
      });
      setCapturedVideo(null);
    }
  }, [capturedImage, capturedVideo, selectedFrame, selectedFilter, stickers, addItem]);

  const handleDiscard = useCallback(() => {
    setCapturedImage(null);
    setCapturedVideo(null);
    setStickers([]);
  }, []);

  const handleDownload = useCallback(() => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = `cutebooth-photo-${Date.now()}.png`;
      link.click();
    } else if (capturedVideo) {
      const link = document.createElement('a');
      link.href = capturedVideo;
      link.download = `cutebooth-video-${Date.now()}.webm`;
      link.click();
    }
  }, [capturedImage, capturedVideo]);

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
        <div className="text-8xl animate-float">📸</div>
        <h1 className="text-3xl font-display font-bold text-center text-gradient">
          Welcome to CuteBooth!
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-md">
          Take fun photos with cute frames, filters, and stickers!
        </p>
        <Button variant="cute" size="xl" onClick={startCamera} className="gap-3">
          <CameraIcon className="w-6 h-6" />
          Start Camera
        </Button>
        {error && (
          <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-2 rounded-xl">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
    );
  }

  if (capturedImage || capturedVideo) {
    return (
      <div className="flex flex-col gap-6 px-4 py-6">
        {capturedImage && (
          <PhotoPreview
            imageUrl={capturedImage}
            frame={selectedFrame}
            filter={selectedFilter.cssFilter}
            stickers={stickers}
            onUpdateSticker={updateSticker}
            onRemoveSticker={removeSticker}
            onSave={handleSave}
            onDiscard={handleDiscard}
            onDownload={handleDownload}
          />
        )}
        {capturedVideo && (
          <div className="flex flex-col items-center gap-6">
            <div
              className="overflow-hidden animate-scale-in"
              style={{
                borderColor: selectedFrame.borderColor,
                borderWidth: selectedFrame.borderWidth,
                borderStyle: selectedFrame.borderStyle,
                borderRadius: selectedFrame.borderRadius,
              }}
            >
              <video
                src={capturedVideo}
                controls
                autoPlay
                loop
                className="max-w-full max-h-[60vh]"
                style={{ filter: selectedFilter.cssFilter }}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="destructive" onClick={handleDiscard}>
                Discard
              </Button>
              <Button variant="secondary" onClick={handleDownload}>
                Download
              </Button>
              <Button variant="cute" onClick={handleSave}>
                Save to Gallery
              </Button>
            </div>
          </div>
        )}

        <EditorPanel
          selectedFrame={selectedFrame}
          selectedFilter={selectedFilter}
          onSelectFrame={setSelectedFrame}
          onSelectFilter={setSelectedFilter}
          onSelectSticker={addSticker}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="relative mx-auto w-full max-w-2xl">
        <div ref={previewContainerRef} className="relative">
          <CameraPreview
            videoRef={videoRef}
            frame={selectedFrame}
            filter={selectedFilter.cssFilter}
            facing={facing}
            className="w-full aspect-[4/3]"
          />
          <StickerLayer
            stickers={stickers}
            onUpdateSticker={updateSticker}
            onRemoveSticker={removeSticker}
            containerRef={previewContainerRef}
          />
          <CountdownOverlay count={countdownValue} isVisible={isCountingDown} />
        </div>
      </div>

      <CaptureControls
        mode={mode}
        countdown={countdown}
        isRecording={isRecording}
        recordingTime={recordingTime}
        hasMultipleCameras={hasMultipleCameras}
        onModeChange={setMode}
        onCountdownChange={setCountdown}
        onCapture={handleCapture}
        onFlipCamera={flipCamera}
      />

      <EditorPanel
        selectedFrame={selectedFrame}
        selectedFilter={selectedFilter}
        onSelectFrame={setSelectedFrame}
        onSelectFilter={setSelectedFilter}
        onSelectSticker={addSticker}
      />
    </div>
  );
};

export default Photobooth;
