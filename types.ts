

export type PreloaderMode = 
  | 'horizontal-split'
  | 'vertical-split'
  | 'slash'
  | 'lattice'
  | 'horizontal-stairs'
  | 'vertical-stairs'
  | 'double-stairs'
  | 'double-stairs-uni'
  | 'pixel'
  | 'pixel-wave'
  | 'pixel-spiral'
  | 'vortex'
  | 'curtain-shred'
  | 'quad-split';

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}