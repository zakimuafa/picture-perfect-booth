import React, { useRef } from 'react';
import { useGallery } from '@/hooks/useGallery';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Button } from '@/components/ui/button';
import { Upload, Image, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PublicGallery: React.FC = () => {
  const { items, addItem, removeItem } = useGallery('public');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload only images or videos.',
          variant: 'destructive',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        addItem({
          type: file.type.startsWith('image/') ? 'photo' : 'video',
          dataUrl,
        });
        toast({
          title: 'Upload successful! 🎉',
          description: 'Your file has been added to the gallery.',
        });
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gradient mb-2">
            Public Gallery 🖼️
          </h1>
          <p className="text-muted-foreground">
            Upload and share your favorite photos & videos
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
          <Button
            variant="cute"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Files
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex gap-4 text-6xl mb-6">
            <span className="animate-bounce-soft" style={{ animationDelay: '0ms' }}>🖼️</span>
            <span className="animate-bounce-soft" style={{ animationDelay: '100ms' }}>📹</span>
            <span className="animate-bounce-soft" style={{ animationDelay: '200ms' }}>✨</span>
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">
            Gallery is empty
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Upload your favorite photos and videos to share with the world!
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Image className="w-4 h-4" />
              Add Photos
            </Button>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Video className="w-4 h-4" />
              Add Videos
            </Button>
          </div>
        </div>
      ) : (
        <GalleryGrid items={items} onRemove={removeItem} showDelete={true} />
      )}
    </div>
  );
};

export default PublicGallery;
