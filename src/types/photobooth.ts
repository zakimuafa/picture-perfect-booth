export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  dataUrl: string;
  thumbnail?: string;
  createdAt: Date;
  frame?: string;
  filter?: string;
  stickers?: StickerData[];
}

export interface StickerData {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface Frame {
  id: string;
  name: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'double';
  borderRadius: number;
  gradient?: string;
  pattern?: string;
}

export interface Filter {
  id: string;
  name: string;
  cssFilter: string;
  intensity: number;
}

export interface Sticker {
  id: string;
  emoji: string;
  category: 'emoji' | 'animals' | 'love' | 'text' | 'fun';
}

export type CameraFacing = 'user' | 'environment';

export type CountdownOption = 0 | 3 | 5;

export type CaptureMode = 'photo' | 'video';
