import React from 'react';
import { Filter } from '@/types/photobooth';
import { filters } from '@/data/filters';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface FilterSelectorProps {
  selectedFilter: Filter;
  onSelectFilter: (filter: Filter) => void;
}

export const FilterSelector: React.FC<FilterSelectorProps> = ({
  selectedFilter,
  onSelectFilter,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground px-1">Filters</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onSelectFilter(filter)}
              className={cn(
                'flex-shrink-0 flex flex-col items-center gap-1.5',
                'transition-all duration-200 hover:scale-105 active:scale-95'
              )}
            >
              <div
                className={cn(
                  'w-16 h-16 rounded-xl overflow-hidden',
                  'bg-gradient-to-br from-coral via-lavender to-mint',
                  selectedFilter.id === filter.id
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'ring-1 ring-border'
                )}
                style={{ filter: filter.cssFilter }}
              />
              <span className="text-xs font-medium text-muted-foreground">
                {filter.name}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
