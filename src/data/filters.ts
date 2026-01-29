import { Filter } from '@/types/photobooth';

export const filters: Filter[] = [
  {
    id: 'none',
    name: 'Normal',
    cssFilter: 'none',
    intensity: 100,
  },
  {
    id: 'vintage',
    name: 'Vintage',
    cssFilter: 'sepia(40%) contrast(90%) brightness(105%)',
    intensity: 100,
  },
  {
    id: 'bw',
    name: 'B&W',
    cssFilter: 'grayscale(100%)',
    intensity: 100,
  },
  {
    id: 'soft-glow',
    name: 'Soft Glow',
    cssFilter: 'brightness(110%) contrast(95%) blur(0.5px)',
    intensity: 100,
  },
  {
    id: 'warm',
    name: 'Warm',
    cssFilter: 'sepia(20%) saturate(140%) brightness(105%)',
    intensity: 100,
  },
  {
    id: 'cool',
    name: 'Cool',
    cssFilter: 'saturate(80%) brightness(105%) hue-rotate(10deg)',
    intensity: 100,
  },
  {
    id: 'dreamy',
    name: 'Dreamy',
    cssFilter: 'brightness(110%) contrast(85%) saturate(120%)',
    intensity: 100,
  },
  {
    id: 'vivid',
    name: 'Vivid',
    cssFilter: 'saturate(150%) contrast(110%)',
    intensity: 100,
  },
  {
    id: 'fade',
    name: 'Fade',
    cssFilter: 'contrast(90%) brightness(110%) saturate(80%)',
    intensity: 100,
  },
  {
    id: 'film',
    name: 'Film',
    cssFilter: 'sepia(10%) contrast(105%) brightness(95%)',
    intensity: 100,
  },
];
