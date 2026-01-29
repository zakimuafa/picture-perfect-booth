import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FrameSelector } from './FrameSelector';
import { FilterSelector } from './FilterSelector';
import { StickerPicker } from './StickerPicker';
import { Frame, Filter, Sticker } from '@/types/photobooth';
import { ImageIcon, Sparkles, Smile } from 'lucide-react';

interface EditorPanelProps {
  selectedFrame: Frame;
  selectedFilter: Filter;
  onSelectFrame: (frame: Frame) => void;
  onSelectFilter: (filter: Filter) => void;
  onSelectSticker: (sticker: Sticker) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  selectedFrame,
  selectedFilter,
  onSelectFrame,
  onSelectFilter,
  onSelectSticker,
}) => {
  return (
    <div className="card-cute p-4 bg-card/80 backdrop-blur-sm">
      <Tabs defaultValue="frames" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 rounded-xl p-1">
          <TabsTrigger 
            value="frames" 
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Frames</span>
          </TabsTrigger>
          <TabsTrigger 
            value="filters"
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </TabsTrigger>
          <TabsTrigger 
            value="stickers"
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
          >
            <Smile className="w-4 h-4" />
            <span className="hidden sm:inline">Stickers</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="frames" className="mt-4">
          <FrameSelector
            selectedFrame={selectedFrame}
            onSelectFrame={onSelectFrame}
          />
        </TabsContent>
        <TabsContent value="filters" className="mt-4">
          <FilterSelector
            selectedFilter={selectedFilter}
            onSelectFilter={onSelectFilter}
          />
        </TabsContent>
        <TabsContent value="stickers" className="mt-4">
          <StickerPicker onSelectSticker={onSelectSticker} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
