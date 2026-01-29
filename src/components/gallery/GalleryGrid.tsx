import React, { useState } from 'react';
import { MediaItem } from '@/types/photobooth';
import { cn } from '@/lib/utils';
import { Download, Trash2, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';

interface GalleryGridProps {
  items: MediaItem[];
  onRemove?: (id: string) => void;
  showDelete?: boolean;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  onRemove,
  showDelete = true,
}) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const handleDownload = (item: MediaItem) => {
    const link = document.createElement('a');
    link.href = item.dataUrl;
    link.download = `photobooth-${item.type}-${item.id}.${item.type === 'photo' ? 'png' : 'webm'}`;
    link.click();
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4 animate-bounce-soft">📸</div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
          No memories yet!
        </h3>
        <p className="text-muted-foreground">
          Start taking photos to fill your gallery
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'relative group cursor-pointer rounded-2xl overflow-hidden',
              'bg-muted aspect-square',
              'transition-all duration-300 hover:scale-105 hover:shadow-float',
              'animate-fade-in'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setSelectedItem(item)}
          >
            {item.type === 'photo' ? (
              <img
                src={item.dataUrl}
                alt="Gallery item"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={item.dataUrl}
                  className="w-full h-full object-cover"
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                  <Play className="w-10 h-10 text-primary-foreground fill-primary-foreground" />
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            
            <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-xs text-primary-foreground/80">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
              {showDelete && onRemove && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.id);
                  }}
                  className="p-1 rounded-full bg-destructive/80 text-destructive-foreground hover:bg-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative bg-card rounded-3xl overflow-hidden shadow-float">
            <DialogClose className="absolute top-4 right-4 z-10 p-2 rounded-full bg-foreground/20 text-primary-foreground hover:bg-foreground/40 transition-colors">
              <X className="w-5 h-5" />
            </DialogClose>
            
            {selectedItem?.type === 'photo' ? (
              <img
                src={selectedItem.dataUrl}
                alt="Full view"
                className="w-full max-h-[80vh] object-contain"
              />
            ) : (
              <video
                src={selectedItem?.dataUrl}
                controls
                autoPlay
                className="w-full max-h-[80vh]"
              />
            )}
            
            <div className="absolute bottom-4 right-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => selectedItem && handleDownload(selectedItem)}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
