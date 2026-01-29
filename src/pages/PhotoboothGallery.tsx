import React from 'react';
import { useGallery } from '@/hooks/useGallery';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Button } from '@/components/ui/button';
import { Trash2, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const PhotoboothGallery: React.FC = () => {
  const { items, removeItem, clearAll } = useGallery('photobooth');

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gradient mb-2">
            My Photobooth Gallery 📸
          </h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? 'memory' : 'memories'} captured
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/">
            <Button variant="cute" className="gap-2">
              <Camera className="w-4 h-4" />
              Take More Photos
            </Button>
          </Link>

          {items.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2 text-destructive border-destructive">
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display">Clear all photos?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all {items.length} items from your gallery. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearAll}
                    className="bg-destructive text-destructive-foreground rounded-xl"
                  >
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <GalleryGrid items={items} onRemove={removeItem} showDelete={true} />
    </div>
  );
};

export default PhotoboothGallery;
