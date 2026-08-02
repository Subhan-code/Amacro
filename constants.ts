
// Define the easing variables used in the CSS
export const CSS_VARS = `
@property --r {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

@property --angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0deg;
}

@property --stop {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

@property --p {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

@property --gradient-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

:root {
  --duration: 1.2s; /* Default showcase duration */
  --expo-in: linear(
    0 0%, 0.0085 31.26%, 0.0167 40.94%,
    0.0289 48.86%, 0.0471 55.92%,
    0.0717 61.99%, 0.1038 67.32%,
    0.1443 72.07%, 0.1989 76.7%,
    0.2659 80.89%, 0.3465 84.71%,
    0.4419 88.22%, 0.554 91.48%,
    0.6835 94.51%, 0.8316 97.34%, 1 100%
  );
  --expo-out: linear(
    0 0%, 0.1684 2.66%, 0.3165 5.49%,
    0.446 8.52%, 0.5581 11.78%,
    0.6535 15.29%, 0.7341 19.11%,
    0.8011 23.3%, 0.8557 27.93%,
    0.8962 32.68%, 0.9283 38.01%,
    0.9529 44.08%, 0.9711 51.14%,
    0.9833 59.06%, 0.9915 68.74%, 1 100%
  );
  --bounce-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  --elastic-out: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes loading {
	0% {
		--gradient-angle: 0deg;
	}
	100% {
		--gradient-angle: 360deg;
	}
}
`;

export type TransitionCategory = 'Basic' | 'Hard' | 'Crazy';

export interface TransitionDefinition {
  id: string;
  name: string;
  description: string;
  css: string;
  type: 'mask' | 'clip-path' | 'gif' | 'transform';
  category: TransitionCategory;
}

export const TRANSITIONS: Record<string, TransitionDefinition> = {
  // =================================================================
  // BASIC
  // =================================================================
  'fade': {
    id: 'fade',
    name: 'Fade',
    description: 'A smooth cross-dissolve.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease-out forwards; }
::view-transition-new(root) { animation: fade-in var(--duration) ease-out forwards; }
@keyframes fade-out { to { opacity: 0; } }
@keyframes fade-in { from { opacity: 0; } }`
  },
  'grow': {
    id: 'grow',
    name: 'Grow',
    description: 'New theme scales up from center.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: grow-in var(--duration) var(--expo-out) forwards; }
@keyframes grow-in { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`
  },
  'shrink': {
    id: 'shrink',
    name: 'Shrink',
    description: 'Old theme scales down to center.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: shrink-out var(--duration) var(--expo-out) forwards; z-index: 10; }
::view-transition-new(root) { animation: fade-in var(--duration) ease forwards; }
@keyframes shrink-out { to { transform: scale(0); opacity: 0; } }`
  },
  'push': {
    id: 'push',
    name: 'Push',
    description: 'Pushes the old theme to the left.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: slide-left-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: slide-left-in var(--duration) ease forwards; }
@keyframes slide-left-out { to { transform: translateX(-100%); } }
@keyframes slide-left-in { from { transform: translateX(100%); } }`
  },
  'pop': {
    id: 'pop',
    name: 'Pop',
    description: 'New theme pops over the old one.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: scale-down var(--duration) ease forwards; filter: brightness(0.5); }
::view-transition-new(root) { animation: slide-up var(--duration) var(--expo-out) forwards; }
@keyframes scale-down { to { transform: scale(0.9); opacity: 0; } }
@keyframes slide-up { from { transform: translateY(100%); } }`
  },
  'cover-right': {
    id: 'cover-right',
    name: 'Cover Right',
    description: 'New theme slides in from right.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: scale-down-fade var(--duration) ease forwards; }
::view-transition-new(root) { animation: slide-in-right var(--duration) cubic-bezier(0.16, 1, 0.3, 1) forwards; z-index: 10; box-shadow: -20px 0 50px rgba(0,0,0,0.5); }
@keyframes scale-down-fade { to { transform: scale(0.9); opacity: 0.5; filter: brightness(0.5); } }
@keyframes slide-in-right { from { transform: translateX(100%); } }`
  },
  'cover-left': {
    id: 'cover-left',
    name: 'Cover Left',
    description: 'New theme slides in from left.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: scale-down-fade var(--duration) ease forwards; }
::view-transition-new(root) { animation: slide-in-left var(--duration) cubic-bezier(0.16, 1, 0.3, 1) forwards; z-index: 10; box-shadow: 20px 0 50px rgba(0,0,0,0.5); }
@keyframes slide-in-left { from { transform: translateX(-100%); } }`
  },
  'cover-up': {
    id: 'cover-up',
    name: 'Cover Up',
    description: 'New theme slides in from bottom.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: scale-down-fade var(--duration) ease forwards; }
::view-transition-new(root) { animation: slide-in-up var(--duration) cubic-bezier(0.16, 1, 0.3, 1) forwards; z-index: 10; box-shadow: 0 -20px 50px rgba(0,0,0,0.5); }
@keyframes slide-in-up { from { transform: translateY(100%); } }`
  },
  'cover-down': {
    id: 'cover-down',
    name: 'Cover Down',
    description: 'New theme slides in from top.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: scale-down-fade var(--duration) ease forwards; }
::view-transition-new(root) { animation: slide-in-down var(--duration) cubic-bezier(0.16, 1, 0.3, 1) forwards; z-index: 10; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
@keyframes slide-in-down { from { transform: translateY(-100%); } }`
  },
  'forward': {
    id: 'forward',
    name: 'Forward',
    description: 'Moves forward in depth.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: zoom-out var(--duration) ease forwards; opacity: 0; }
::view-transition-new(root) { animation: zoom-in-fwd var(--duration) ease forwards; }
@keyframes zoom-out { to { transform: scale(1.5); opacity: 0; } }
@keyframes zoom-in-fwd { from { transform: scale(0.5); opacity: 0; } }`
  },
  'backward': {
    id: 'backward',
    name: 'Backward',
    description: 'Moves backward in depth.',
    type: 'transform',
    category: 'Basic',
    css: `
::view-transition-old(root) { animation: zoom-in-back var(--duration) ease forwards; z-index: 10; }
::view-transition-new(root) { animation: stay var(--duration) ease forwards; }
@keyframes zoom-in-back { to { transform: scale(0.5); opacity: 0; } }
@keyframes stay { from { opacity: 1; } }`
  },
  'circle': {
    id: 'circle',
    name: 'Simple Circle',
    description: 'Clean circular expansion from the cursor.',
    type: 'clip-path',
    category: 'Basic',
    css: `
::view-transition-new(root) { animation: circle-open var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes circle-open { from { clip-path: circle(0% at var(--x) var(--y)); } to { clip-path: circle(150% at var(--x) var(--y)); } }`
  },
  'cursor-clip': {
    id: 'cursor-clip',
    name: 'Cursor Clip',
    description: 'Circular expansion from click target.',
    type: 'clip-path',
    category: 'Basic',
    css: `
::view-transition-new(root) { animation: reveal-in .5s ease-in-out forwards; }
::view-transition-old(root) { animation: reveal-out .5s ease-in-out .5s forwards; }
@keyframes reveal-in { from { clip-path: circle(0% at var(--x) var(--y)); } to { clip-path: circle(150% at var(--x) var(--y)); } }
@keyframes reveal-out { from { clip-path: circle(150% at var(--x) var(--y)); } to { clip-path: circle(0% at var(--x) var(--y)); } }`
  },
  'circle-top-left': {
    id: 'circle-top-left',
    name: 'Corner Wipe',
    description: 'Expands from top-left corner.',
    type: 'mask',
    category: 'Basic',
    css: `
::view-transition-group(root) { animation-timing-function: var(--expo-out); }
::view-transition-new(root) {
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="0" cy="0" r="18" fill="white" filter="url(%23blur)"/></svg>') top left / 0 no-repeat;
  mask-origin: content-box;
  animation: scale 1s;
  animation-fill-mode: both;
  transform-origin: top left;
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes scale { to { mask-size: 350vmax; } }`
  },
  'star-wipe': {
    id: 'star-wipe',
    name: 'Star Wipe',
    description: 'A classic 5-point star reveal.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-group(root) { animation-timing-function: var(--expo-out); }
::view-transition-new(root) {
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>') center / 0 no-repeat;
  animation: scale-star 1s ease-in-out forwards;
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes scale-star { to { mask-size: 300vmax; } }`
  },
  'vertical-blinds': {
    id: 'vertical-blinds',
    name: 'Vertical Blinds',
    description: 'Slices the screen into vertical columns.',
    type: 'mask',
    category: 'Basic',
    css: `
::view-transition-new(root) {
  mask: repeating-linear-gradient(to right, #000 0px, #000 0px, transparent 0px, transparent 30px);
  animation: blinds-open 1s var(--expo-out) forwards;
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes blinds-open { to { mask: repeating-linear-gradient(to right, #000 0px, #000 30px, transparent 30px, transparent 30px); } }`
  },
  'angled-wipe': {
    id: 'angled-wipe',
    name: 'Angled Wipe',
    description: 'Sharp 45-degree diagonal wipe.',
    type: 'clip-path',
    category: 'Basic',
    css: `
::view-transition-group(root) { animation-timing-function: var(--expo-out); }
::view-transition-new(root) { animation: angled-in 0.8s forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes angled-in { from { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); } to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }`
  },
  'circle-blur': {
    id: 'circle-blur',
    name: 'Blurred Circle',
    description: 'Circular reveal with soft edges.',
    type: 'mask',
    category: 'Basic',
    css: `
::view-transition-new(root) { mask: radial-gradient(circle at var(--x) var(--y), white var(--r), transparent calc(var(--r) + 20%)); mask-repeat: no-repeat; animation: blur-open var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes blur-open { from { --r: 0%; } to { --r: 150%; } }`
  },

  // =================================================================
  // HARD
  // =================================================================
  'dots-reveal': {
    id: 'dots-reveal',
    name: 'Dots Grid',
    description: 'A grid of expanding dots reveals the theme.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { 
  mask: radial-gradient(circle, white var(--r), transparent var(--r)); 
  mask-size: 40px 40px; 
  mask-repeat: repeat; 
  animation: dots-reveal var(--duration) var(--expo-out) forwards; 
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes dots-reveal { from { --r: 0%; } to { --r: 100%; } }`
  },
  'hex-reveal': {
    id: 'hex-reveal',
    name: 'Hexagon Grid',
    description: 'A grid of hexagons reveals the theme.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { 
  mask: repeating-conic-gradient(from 0deg, white 0deg, white var(--angle), transparent var(--angle), transparent 60deg);
  mask-size: 40px 40px; 
  mask-repeat: repeat; 
  animation: hex-reveal var(--duration) var(--expo-out) forwards; 
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes hex-reveal { from { --angle: 0deg; } to { --angle: 60deg; } }`
  },
  'bar-wipe-v-down': {
    id: 'bar-wipe-v-down',
    name: 'Bars Wipe Down',
    description: '5 vertical bars wipe down sequentially.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { 
  mask-image: linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000);
  mask-repeat: no-repeat;
  mask-position: 0% 0, 25% 0, 50% 0, 75% 0, 100% 0;
  animation: bar-wipe-v-down var(--duration) linear forwards; 
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes bar-wipe-v-down { 
  0% { mask-size: 20% 0, 20% 0, 20% 0, 20% 0, 20% 0; }
  20% { mask-size: 20% 100%, 20% 0, 20% 0, 20% 0, 20% 0; }
  40% { mask-size: 20% 100%, 20% 100%, 20% 0, 20% 0, 20% 0; }
  60% { mask-size: 20% 100%, 20% 100%, 20% 100%, 20% 0, 20% 0; }
  80% { mask-size: 20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 0; }
  100% { mask-size: 20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%; }
}`
  },
  'bar-wipe-v-up': {
    id: 'bar-wipe-v-up',
    name: 'Bars Wipe Up',
    description: '5 vertical bars wipe up sequentially.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { 
  mask-image: linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000);
  mask-repeat: no-repeat;
  mask-position: 0% 100%, 25% 100%, 50% 100%, 75% 100%, 100% 100%;
  animation: bar-wipe-v-up var(--duration) linear forwards; 
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes bar-wipe-v-up { 
  0% { mask-size: 20% 0, 20% 0, 20% 0, 20% 0, 20% 0; }
  20% { mask-size: 20% 100%, 20% 0, 20% 0, 20% 0, 20% 0; }
  40% { mask-size: 20% 100%, 20% 100%, 20% 0, 20% 0, 20% 0; }
  60% { mask-size: 20% 100%, 20% 100%, 20% 100%, 20% 0, 20% 0; }
  80% { mask-size: 20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 0; }
  100% { mask-size: 20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%; }
}`
  },
  'bar-wipe-h-right': {
    id: 'bar-wipe-h-right',
    name: 'Bars Wipe Right',
    description: '5 horizontal rows wipe right sequentially.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { 
  mask-image: linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000);
  mask-repeat: no-repeat;
  mask-position: 0 0%, 0 25%, 0 50%, 0 75%, 0 100%;
  animation: bar-wipe-h-right var(--duration) linear forwards; 
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes bar-wipe-h-right { 
  0% { mask-size: 0 20%, 0 20%, 0 20%, 0 20%, 0 20%; }
  20% { mask-size: 100% 20%, 0 20%, 0 20%, 0 20%, 0 20%; }
  40% { mask-size: 100% 20%, 100% 20%, 0 20%, 0 20%, 0 20%; }
  60% { mask-size: 100% 20%, 100% 20%, 100% 20%, 0 20%, 0 20%; }
  80% { mask-size: 100% 20%, 100% 20%, 100% 20%, 100% 20%, 0 20%; }
  100% { mask-size: 100% 20%, 100% 20%, 100% 20%, 100% 20%, 100% 20%; }
}`
  },
  'bar-wipe-h-left': {
    id: 'bar-wipe-h-left',
    name: 'Bars Wipe Left',
    description: '5 horizontal rows wipe left sequentially.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { 
  mask-image: linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000);
  mask-repeat: no-repeat;
  mask-position: 100% 0%, 100% 25%, 100% 50%, 100% 75%, 100% 100%;
  animation: bar-wipe-h-left var(--duration) linear forwards; 
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes bar-wipe-h-left { 
  0% { mask-size: 0 20%, 0 20%, 0 20%, 0 20%, 0 20%; }
  20% { mask-size: 100% 20%, 0 20%, 0 20%, 0 20%, 0 20%; }
  40% { mask-size: 100% 20%, 100% 20%, 0 20%, 0 20%, 0 20%; }
  60% { mask-size: 100% 20%, 100% 20%, 100% 20%, 0 20%, 0 20%; }
  80% { mask-size: 100% 20%, 100% 20%, 100% 20%, 100% 20%, 0 20%; }
  100% { mask-size: 100% 20%, 100% 20%, 100% 20%, 100% 20%, 100% 20%; }
}`
  },
  'blinds-v': {
    id: 'blinds-v',
    name: 'Vertical Blinds',
    description: 'Reveals in vertical strips.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { mask: repeating-linear-gradient(to right, black 0%, black var(--p), transparent var(--p), transparent 10%); animation: blinds-anim var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes blinds-anim { from { --p: 0%; } to { --p: 10%; } }`
  },
  'blinds-h': {
    id: 'blinds-h',
    name: 'Horizontal Blinds',
    description: 'Reveals in horizontal strips.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { mask: repeating-linear-gradient(to bottom, black 0%, black var(--p), transparent var(--p), transparent 10%); animation: blinds-anim var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes blinds-anim { from { --p: 0%; } to { --p: 10%; } }`
  },
  'step-wipe-right': {
    id: 'step-wipe-right',
    name: 'Stepped Wipe Right',
    description: 'Wipes right in discrete steps.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: step-wipe-right var(--duration) steps(6, end) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes step-wipe-right { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }`
  },
  'step-wipe-down': {
    id: 'step-wipe-down',
    name: 'Stepped Wipe Down',
    description: 'Wipes down in discrete steps.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: step-wipe-down var(--duration) steps(6, end) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes step-wipe-down { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }`
  },
  'step-box-out': {
    id: 'step-box-out',
    name: 'Stepped Box Out',
    description: 'Expands a box in discrete steps.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: step-box-out var(--duration) steps(5, end) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes step-box-out { from { clip-path: inset(50% 50% 50% 50%); } to { clip-path: inset(0 0 0 0); } }`
  },
  'shutter-out-v': {
    id: 'shutter-out-v',
    name: 'Shutter Out Vertical',
    description: 'Expands vertically from the center.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: shutter-v-open var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes shutter-v-open { from { clip-path: inset(50% 0 50% 0); } to { clip-path: inset(0 0 0 0); } }`
  },
  'shutter-in-v': {
    id: 'shutter-in-v',
    name: 'Shutter In Vertical',
    description: 'Closes in from top and bottom.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { mask: linear-gradient(to bottom, black 0%, black var(--p), transparent var(--p), transparent calc(100% - var(--p)), black calc(100% - var(--p)), black 100%); animation: shutter-v-close var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes shutter-v-close { from { --p: 0%; } to { --p: 50%; } }`
  },
  'shutter-out-h': {
    id: 'shutter-out-h',
    name: 'Shutter Out Horizontal',
    description: 'Expands horizontally from the center.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: shutter-h-open var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes shutter-h-open { from { clip-path: inset(0 50% 0 50%); } to { clip-path: inset(0 0 0 0); } }`
  },
  'shutter-in-h': {
    id: 'shutter-in-h',
    name: 'Shutter In Horizontal',
    description: 'Closes in from left and right.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { mask: linear-gradient(to right, black 0%, black var(--p), transparent var(--p), transparent calc(100% - var(--p)), black calc(100% - var(--p)), black 100%); animation: shutter-h-close var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes shutter-h-close { from { --p: 0%; } to { --p: 50%; } }`
  },
  'sweep-right': {
    id: 'sweep-right',
    name: 'Sweep To Right',
    description: 'Wipes from left to right.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: sweep-right var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes sweep-right { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }`
  },
  'sweep-left': {
    id: 'sweep-left',
    name: 'Sweep To Left',
    description: 'Wipes from right to left.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: sweep-left var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes sweep-left { from { clip-path: inset(0 0 0 100%); } to { clip-path: inset(0 0 0 0); } }`
  },
  'sweep-bottom': {
    id: 'sweep-bottom',
    name: 'Sweep To Bottom',
    description: 'Wipes from top to bottom.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: sweep-bottom var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes sweep-bottom { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }`
  },
  'sweep-top': {
    id: 'sweep-top',
    name: 'Sweep To Top',
    description: 'Wipes from bottom to top.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: sweep-top var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes sweep-top { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0 0 0 0); } }`
  },
  'bounce-in': {
    id: 'bounce-in',
    name: 'Bounce In',
    description: 'Bounces in from the center.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: none; z-index: -1; }
::view-transition-new(root) { animation: bounce-in var(--duration) var(--bounce-easing) forwards; }
@keyframes bounce-in { 0% { opacity: 0; transform: scale(.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(.9); } 100% { transform: scale(1); } }`
  },
  'bounce-out': {
    id: 'bounce-out',
    name: 'Bounce Out',
    description: 'Bounces out to the center.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: bounce-out var(--duration) var(--bounce-easing) forwards; z-index: 10; }
::view-transition-new(root) { animation: fade-in var(--duration) forwards; }
@keyframes bounce-out { 20% { transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0; transform: scale(0.3); } }`
  },
  'rotate': {
    id: 'rotate',
    name: 'Rotate',
    description: 'Rotates the new theme in.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: rotate-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: rotate-in var(--duration) ease forwards; }
@keyframes rotate-out { to { transform: rotate(-90deg); opacity: 0; } }
@keyframes rotate-in { from { transform: rotate(90deg); opacity: 0; } }`
  },
  'rotate-grow': {
    id: 'rotate-grow',
    name: 'Rotate Grow',
    description: 'Spins and scales up.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: rotate-grow var(--duration) var(--expo-out) forwards; transform-origin: center; }
@keyframes rotate-grow { from { transform: scale(0) rotate(-180deg); opacity: 0; } to { transform: scale(1) rotate(0); opacity: 1; } }`
  },
  'float': {
    id: 'float',
    name: 'Float',
    description: 'Floats up into place.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: float-up var(--duration) ease-out forwards; }
@keyframes float-up { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`
  },
  'sink': {
    id: 'sink',
    name: 'Sink',
    description: 'Sinks down into place.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: sink-down var(--duration) ease-out forwards; }
@keyframes sink-down { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`
  },
  'bob': {
    id: 'bob',
    name: 'Bob',
    description: 'Bobs gently into view.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: bob-in var(--duration) var(--bounce-easing) forwards; }
@keyframes bob-in { 0% { transform: translateY(-20px); opacity: 0; } 50% { transform: translateY(10px); } 100% { transform: translateY(0); opacity: 1; } }`
  },
  'hang': {
    id: 'hang',
    name: 'Hang',
    description: 'Swings down from the top.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: hang-in var(--duration) var(--elastic-out) forwards; transform-origin: top center; }
@keyframes hang-in { 0% { transform: rotateX(-90deg); opacity: 0; } 100% { transform: rotateX(0); opacity: 1; } }`
  },
  'skew': {
    id: 'skew',
    name: 'Skew',
    description: 'Skews into existence.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: skew-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: skew-in var(--duration) ease forwards; }
@keyframes skew-out { to { transform: skewX(20deg); opacity: 0; } }
@keyframes skew-in { from { transform: skewX(-20deg); opacity: 0; } }`
  },
  'skew-forward': {
    id: 'skew-forward',
    name: 'Skew Forward',
    description: 'Skews while moving forward.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: skew-fwd var(--duration) var(--expo-out) forwards; transform-origin: left bottom; }
@keyframes skew-fwd { 0% { transform: skewX(-20deg) scale(0.5); opacity: 0; } 100% { transform: skewX(0) scale(1); opacity: 1; } }`
  },
  'skew-backward': {
    id: 'skew-backward',
    name: 'Skew Backward',
    description: 'Skews while receding.',
    type: 'transform',
    category: 'Hard',
    css: `
::view-transition-old(root) { animation: skew-back var(--duration) var(--expo-in) forwards; transform-origin: right top; z-index: 10; }
::view-transition-new(root) { animation: fade-in var(--duration) ease forwards; }
@keyframes skew-back { to { transform: skewX(20deg) scale(0.5); opacity: 0; } }`
  },
  'clock-wipe': {
    id: 'clock-wipe',
    name: 'Clock Wipe',
    description: 'A circular sweep animation.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { mask: conic-gradient(from -90deg at var(--x) var(--y), white var(--angle), transparent var(--angle)); animation: clock var(--duration) linear forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes clock { from { --angle: 0deg; } to { --angle: 360deg; } }`
  },
  'tunnel-wipe': {
    id: 'tunnel-wipe',
    name: 'Tunnel Vision',
    description: 'Concentric rings expanding.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { mask: repeating-radial-gradient(circle at var(--x) var(--y), white 0, white var(--stop), transparent var(--stop), transparent calc(var(--stop) * 2)); animation: tunnel var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes tunnel { from { --stop: 0%; } to { --stop: 100%; } }`
  },
  'diamond-wipe': {
    id: 'diamond-wipe',
    name: 'Diamond Reveal',
    description: 'Expands a diamond from center.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: diamond-in var(--duration) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes diamond-in { from { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); } to { clip-path: polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%); } }`
  },
  'radial-out': {
    id: 'radial-out',
    name: 'Radial Out',
    description: 'Expands a circle from the center.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: radial-out var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes radial-out { from { clip-path: circle(0% at 50% 50%); } to { clip-path: circle(150% at 50% 50%); } }`
  },
  'radial-in': {
    id: 'radial-in',
    name: 'Radial In',
    description: 'Reveals from corners towards center.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { mask: radial-gradient(circle at 50% 50%, transparent var(--p), black var(--p)); animation: radial-in var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes radial-in { from { --p: 100%; } to { --p: 0%; } }`
  },
  'rect-out': {
    id: 'rect-out',
    name: 'Rectangle Out',
    description: 'Expands a rectangle from the center.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: rect-out var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes rect-out { from { clip-path: inset(50% 50% 50% 50%); } to { clip-path: inset(0 0 0 0); } }`
  },
  'rect-in': {
    id: 'rect-in',
    name: 'Rectangle In',
    description: 'Reveals from edges inwards.',
    type: 'mask',
    category: 'Hard',
    css: `
::view-transition-new(root) { mask: linear-gradient(to right, black var(--p), transparent var(--p), transparent calc(100% - var(--p)), black calc(100% - var(--p)), linear-gradient(to bottom, black var(--p), transparent var(--p), transparent calc(100% - var(--p)), black calc(100% - var(--p))); mask-composite: add; animation: rect-in var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes rect-in { from { --p: 0%; } to { --p: 50%; } }`
  },
  'round-corners': {
    id: 'round-corners',
    name: 'Round Corners',
    description: 'Expands from a rounded rectangle.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: round-corners-in var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes round-corners-in { from { clip-path: inset(20% 20% 20% 20% round 50%); } to { clip-path: inset(0 0 0 0 round 0); } }`
  },
  'underline-center': {
    id: 'underline-center',
    name: 'Underline From Center',
    description: 'Expands upwards from the bottom center.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: underline-center var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes underline-center { from { clip-path: inset(100% 50% 0 50%); } to { clip-path: inset(0 0 0 0); } }`
  },
  'overline-center': {
    id: 'overline-center',
    name: 'Overline From Center',
    description: 'Expands downwards from the top center.',
    type: 'clip-path',
    category: 'Hard',
    css: `
::view-transition-new(root) { animation: overline-center var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes overline-center { from { clip-path: inset(0 50% 100% 50%); } to { clip-path: inset(0 0 0 0); } }`
  },

  // =================================================================
  // CRAZY
  // =================================================================
  'horizontal-split': {
    id: 'horizontal-split',
    name: 'Horizontal Split',
    description: 'Dual-axis reveal from center line outward.',
    type: 'mask',
    category: 'Crazy',
    css: `
::view-transition-new(root) { 
  mask-image: linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000),
              linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000);
  mask-repeat: no-repeat;
  mask-position: 50% 0, 50% 14.28%, 50% 28.57%, 50% 42.85%, 50% 57.14%, 50% 71.42%, 50% 85.71%, 50% 100%;
  animation: horizontal-split var(--duration) linear forwards; 
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes horizontal-split { 
  0% { mask-size: 0% 12.5%, 0% 12.5%, 0% 12.5%, 0% 12.5%, 0% 12.5%, 0% 12.5%, 0% 12.5%, 0% 12.5%; }
  15% { mask-size: 0% 12.5%, 0% 12.5%, 0% 12.5%, 50% 12.5%, 50% 12.5%, 0% 12.5%, 0% 12.5%, 0% 12.5%; }
  30% { mask-size: 0% 12.5%, 0% 12.5%, 50% 12.5%, 100% 12.5%, 100% 12.5%, 50% 12.5%, 0% 12.5%, 0% 12.5%; }
  45% { mask-size: 0% 12.5%, 50% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 50% 12.5%, 0% 12.5%; }
  60% { mask-size: 50% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 50% 12.5%; }
  100% { mask-size: 100% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%, 100% 12.5%; }
}` 
  },
  'liquid-wipe': {
    id: 'liquid-wipe',
    name: 'Liquid Wipe',
    description: 'A smooth, organic liquid expansion from the center.',
    type: 'clip-path',
    category: 'Crazy',
    css: `
::view-transition-new(root) { animation: liquid-wipe var(--duration) cubic-bezier(0.4, 0, 0.2, 1) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes liquid-wipe {
  0% { clip-path: inset(50% 50% 50% 50% round 50%); }
  25% { clip-path: inset(35% 35% 35% 35% round 60% 40% 70% 30% / 50% 70% 30% 50%); }
  50% { clip-path: inset(15% 20% 20% 15% round 50% 60% 40% 70% / 60% 40% 60% 40%); }
  75% { clip-path: inset(5% 10% 5% 5% round 30% 70% 50% 50% / 40% 60% 40% 60%); }
  100% { clip-path: inset(0 0 0 0 round 0%); }
}`
  },
  'vortex-out': {
    id: 'vortex-out',
    name: 'Vortex Out',
    description: 'The old view spirals into the void.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: vortex-out var(--duration) ease-in forwards; z-index: 10; transform-origin: center; }
::view-transition-new(root) { animation: fade-in var(--duration) ease forwards; }
@keyframes vortex-out { to { transform: rotate(720deg) scale(0); opacity: 0; } }`
  },
  'vortex-in': {
    id: 'vortex-in',
    name: 'Vortex In',
    description: 'The new view spirals out from the void.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: vortex-in var(--duration) ease-out forwards; transform-origin: center; }
@keyframes vortex-in { from { transform: rotate(-720deg) scale(0); opacity: 0; } to { transform: rotate(0) scale(1); opacity: 1; } }`
  },
  'pixel-storm': {
    id: 'pixel-storm',
    name: 'Pixel Storm',
    description: 'Chaotic pixelated noise reveal.',
    type: 'mask',
    category: 'Crazy',
    css: `
::view-transition-new(root) { 
  mask: repeating-conic-gradient(#000 0% 25%, transparent 0% 50%); 
  mask-size: 20px 20px;
  animation: pixel-storm var(--duration) steps(10) forwards; 
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes pixel-storm { 
  0% { mask-size: 200% 200%; mask-position: 50% 50%; opacity: 0; } 
  20% { mask-size: 100% 100%; opacity: 1; }
  100% { mask-size: 2px 2px; }
}`
  },
  'pixel-lattice': {
    id: 'pixel-lattice',
    name: 'Pixel Lattice',
    description: 'An expanding grid of discrete pixels.',
    type: 'mask',
    category: 'Crazy',
    css: `
::view-transition-new(root) {
  mask: repeating-linear-gradient(90deg, black 0, black var(--p), transparent var(--p), transparent 10%),
        repeating-linear-gradient(180deg, black 0, black var(--p), transparent var(--p), transparent 10%);
  mask-composite: add;
  animation: lattice-open var(--duration) steps(10) forwards;
}
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes lattice-open { from { --p: 0%; } to { --p: 10%; } }`
  },
  'blob-morph': {
    id: 'blob-morph',
    name: 'Organic Blob',
    description: 'An organic shape expands to fill the screen.',
    type: 'clip-path',
    category: 'Crazy',
    css: `
::view-transition-new(root) { animation: blob-morph var(--duration) ease-in-out forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes blob-morph {
  0% { clip-path: inset(40% 40% 40% 40% round 50% 40% 30% 70% / 60% 30% 70% 40%); }
  33% { clip-path: inset(20% 20% 30% 20% round 30% 60% 70% 40% / 50% 60% 30% 60%); }
  66% { clip-path: inset(10% 10% 10% 10% round 60% 40% 30% 70% / 40% 40% 60% 60%); }
  100% { clip-path: inset(0 0 0 0 round 0); }
}`
  },
  'space-out': {
    id: 'space-out',
    name: 'Space Out',
    description: 'Warp speed expansion.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: space-warp var(--duration) ease-in forwards; z-index: 10; filter: blur(0px); }
::view-transition-new(root) { animation: fade-in var(--duration) ease forwards; }
@keyframes space-warp {
  0% { transform: scale(1); opacity: 1; filter: blur(0px); }
  50% { filter: blur(4px); }
  100% { transform: scale(5); opacity: 0; filter: blur(20px); }
}`
  },
  'pulse': {
    id: 'pulse',
    name: 'Pulse',
    description: 'A heartbeat effect.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: fade-out 0.3s ease forwards; }
::view-transition-new(root) { animation: pulse-in var(--duration) ease-in-out forwards; }
@keyframes pulse-in { 0% { transform: scale(0.8); opacity: 0; } 50% { transform: scale(1.1); } 70% { transform: scale(0.95); } 100% { transform: scale(1); opacity: 1; } }`
  },
  'pulse-grow': {
    id: 'pulse-grow',
    name: 'Pulse Grow',
    description: 'Pulses deeply while growing.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: pulse-grow var(--duration) var(--elastic-out) forwards; }
@keyframes pulse-grow { 0% { transform: scale(0); opacity: 0; } 40% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }`
  },
  'pulse-shrink': {
    id: 'pulse-shrink',
    name: 'Pulse Shrink',
    description: 'Old theme pulses before shrinking.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: pulse-shrink var(--duration) var(--elastic-out) forwards; z-index: 10; }
::view-transition-new(root) { animation: fade-in var(--duration) ease forwards; }
@keyframes pulse-shrink { 0% { transform: scale(1); } 30% { transform: scale(1.1); } 100% { transform: scale(0); opacity: 0; } }`
  },
  'wobble-h': {
    id: 'wobble-h',
    name: 'Wobble Horizontal',
    description: 'Shakes horizontally.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: wobble-h var(--duration) ease-in-out forwards; }
@keyframes wobble-h { 0% { transform: translateX(-100px) rotate(-5deg); opacity: 0; } 15% { transform: translateX(100px) rotate(3deg); } 30% { transform: translateX(-50px) rotate(-3deg); } 45% { transform: translateX(50px) rotate(2deg); } 60% { transform: translateX(-25px) rotate(-1deg); } 100% { transform: translateX(0) rotate(0); opacity: 1; } }`
  },
  'wobble-v': {
    id: 'wobble-v',
    name: 'Wobble Vertical',
    description: 'Shakes vertically.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: wobble-v var(--duration) ease-in-out forwards; }
@keyframes wobble-v { 0% { transform: translateY(-100px); opacity: 0; } 15% { transform: translateY(100px); } 30% { transform: translateY(-50px); } 45% { transform: translateY(50px); } 60% { transform: translateY(-25px); } 100% { transform: translateY(0); opacity: 1; } }`
  },
  'wobble-br': {
    id: 'wobble-br',
    name: 'Wobble Bottom Right',
    description: 'Wobbles into the bottom right corner.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: wobble-br var(--duration) ease forwards; transform-origin: bottom right; }
@keyframes wobble-br { 0% { transform: scale(0); opacity: 0; } 40% { transform: scale(1.2) rotate(-5deg); } 60% { transform: scale(0.9) rotate(3deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }`
  },
  'wobble-tr': {
    id: 'wobble-tr',
    name: 'Wobble Top Right',
    description: 'Wobbles into the top right corner.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: wobble-tr var(--duration) ease forwards; transform-origin: top right; }
@keyframes wobble-tr { 0% { transform: scale(0); opacity: 0; } 40% { transform: scale(1.2) rotate(5deg); } 60% { transform: scale(0.9) rotate(-3deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }`
  },
  'wobble-skew': {
    id: 'wobble-skew',
    name: 'Wobble Skew',
    description: 'Skews and wobbles wildly.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: wobble-skew var(--duration) ease forwards; }
@keyframes wobble-skew { 0% { transform: skewX(-40deg) scale(0); opacity: 0; } 40% { transform: skewX(20deg) scale(1.1); } 60% { transform: skewX(-10deg) scale(0.95); } 100% { transform: skewX(0) scale(1); opacity: 1; } }`
  },
  'buzz': {
    id: 'buzz',
    name: 'Buzz',
    description: 'Vibrates into existence.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: fade-out var(--duration) ease forwards; }
::view-transition-new(root) { animation: buzz-in var(--duration) linear forwards; }
@keyframes buzz-in { 0% { transform: translateX(10px) scale(0.9); opacity: 0; } 10% { transform: translateX(-10px); } 20% { transform: translateX(10px); } 30% { transform: translateX(-10px); opacity: 1; } 40% { transform: translateX(5px); } 50% { transform: translateX(-5px); } 100% { transform: translateX(0) scale(1); } }`
  },
  'buzz-out': {
    id: 'buzz-out',
    name: 'Buzz Out',
    description: 'Vibrates before disappearing.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: buzz-out var(--duration) linear forwards; z-index: 10; }
::view-transition-new(root) { animation: fade-in var(--duration) ease forwards; }
@keyframes buzz-out { 0% { transform: translateX(0); } 10% { transform: translateX(-10px); } 20% { transform: translateX(10px); } 100% { transform: scale(0); opacity: 0; } }`
  },
  'back-pulse': {
    id: 'back-pulse',
    name: 'Back Pulse',
    description: 'Zooms out the old theme and pulses.',
    type: 'transform',
    category: 'Crazy',
    css: `
::view-transition-old(root) { animation: back-pulse-out var(--duration) var(--expo-in) forwards; z-index: 10; }
::view-transition-new(root) { animation: back-pulse-in var(--duration) var(--expo-out) forwards; }
@keyframes back-pulse-out { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(0.8); opacity: 0; } }
@keyframes back-pulse-in { 0% { transform: scale(1.1); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`
  },
  'ripple-out': {
    id: 'ripple-out',
    name: 'Ripple Out',
    description: 'Concentric ripples expanding.',
    type: 'mask',
    category: 'Crazy',
    css: `
::view-transition-new(root) { mask: repeating-radial-gradient(circle at center, transparent 0, transparent var(--stop), black var(--stop), black calc(var(--stop) + 20%)); animation: ripple-out var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes ripple-out { from { --stop: 0%; } to { --stop: 100%; } }`
  },
  'ripple-in': {
    id: 'ripple-in',
    name: 'Ripple In',
    description: 'Concentric ripples closing in.',
    type: 'mask',
    category: 'Crazy',
    css: `
::view-transition-new(root) { mask: repeating-radial-gradient(circle at center, black 0, black var(--stop), transparent var(--stop), transparent calc(var(--stop) + 20%)); animation: ripple-in var(--duration) var(--expo-out) forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes ripple-in { from { --stop: 100%; } to { --stop: 0%; } }`
  },
  'curl-tl': {
    id: 'curl-tl',
    name: 'Curl Top Left',
    description: 'Peels from top-left corner.',
    type: 'clip-path',
    category: 'Crazy',
    css: `
::view-transition-new(root) { animation: curl-tl var(--duration) ease-in-out forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes curl-tl { from { clip-path: polygon(0 0, 0 0, 0 0); } to { clip-path: polygon(0 0, 250% 0, 0 250%); } }`
  },
  'curl-tr': {
    id: 'curl-tr',
    name: 'Curl Top Right',
    description: 'Peels from top-right corner.',
    type: 'clip-path',
    category: 'Crazy',
    css: `
::view-transition-new(root) { animation: curl-tr var(--duration) ease-in-out forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes curl-tr { from { clip-path: polygon(100% 0, 100% 0, 100% 0); } to { clip-path: polygon(100% 0, -150% 0, 100% 250%); } }`
  },
  'curl-br': {
    id: 'curl-br',
    name: 'Curl Bottom Right',
    description: 'Peels from bottom-right corner.',
    type: 'clip-path',
    category: 'Crazy',
    css: `
::view-transition-new(root) { animation: curl-br var(--duration) ease-in-out forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes curl-br { from { clip-path: polygon(100% 100%, 100% 100%, 100% 100%); } to { clip-path: polygon(100% 100%, -150% 100%, 100% -150%); } }`
  },
  'curl-bl': {
    id: 'curl-bl',
    name: 'Curl Bottom Left',
    description: 'Peels from bottom-left corner.',
    type: 'clip-path',
    category: 'Crazy',
    css: `
::view-transition-new(root) { animation: curl-bl var(--duration) ease-in-out forwards; }
::view-transition-old(root) { animation: none; z-index: -1; }
@keyframes curl-bl { from { clip-path: polygon(0 100%, 0 100%, 0 100%); } to { clip-path: polygon(0 100%, 250% 100%, 0 -150%); } }`
  },
  'gsap-overlay': {
    id: 'gsap-overlay',
    name: 'GSAP Wave',
    description: 'Smooth SVG liquid wave animation.',
    type: 'clip-path',
    category: 'Crazy',
    css: `/* Handled by JS GSAP Timeline */`
  },
  'gif-shigure': {
    id: 'gif-shigure',
    name: 'Shigure Dance',
    description: 'Anime dance GIF mask.',
    type: 'gif',
    category: 'Crazy',
    css: `
::view-transition-group(root) { animation-timing-function: var(--expo-in); }
::view-transition-new(root) { 
    -webkit-mask: url('https://media.tenor.com/cyORI7kwShQAAAAi/shigure-ui-dance.gif') center / 0 no-repeat;
    mask: url('https://media.tenor.com/cyORI7kwShQAAAAi/shigure-ui-dance.gif') center / 0 no-repeat;
    animation: scale var(--duration) forwards; 
    animation-fill-mode: both; 
}
::view-transition-old(root), .dark::view-transition-old(root) { animation: scale var(--duration) forwards; animation-fill-mode: both; }
@keyframes scale { 0% { mask-size: 0; -webkit-mask-size: 0; } 10% { mask-size: 50vmax; -webkit-mask-size: 50vmax; } 90% { mask-size: 50vmax; -webkit-mask-size: 50vmax; } 100% { mask-size: 2000vmax; -webkit-mask-size: 2000vmax; } }`
  },
  'gif-love': {
    id: 'gif-love',
    name: 'Love & Hearts',
    description: 'Cute heart GIF reveal.',
    type: 'gif',
    category: 'Crazy',
    css: `
::view-transition-group(root) { animation-timing-function: var(--expo-in); }
::view-transition-new(root) { 
    -webkit-mask: url('https://media.tenor.com/Jz0aSpk9VIQAAAAi/i-love-you-love.gif') center / 0 no-repeat;
    mask: url('https://media.tenor.com/Jz0aSpk9VIQAAAAi/i-love-you-love.gif') center / 0 no-repeat; 
    animation: scale var(--duration) forwards; 
    animation-fill-mode: both; 
}
::view-transition-old(root), .dark::view-transition-old(root) { animation: scale var(--duration) forwards; animation-fill-mode: both; }
@keyframes scale { 0% { mask-size: 0; -webkit-mask-size: 0; } 10% { mask-size: 50vmax; -webkit-mask-size: 50vmax; } 90% { mask-size: 50vmax; -webkit-mask-size: 50vmax; } 100% { mask-size: 2000vmax; -webkit-mask-size: 2000vmax; } }`
  },
};
