import React from 'react';
import { motion } from 'framer-motion';
import { PreloaderMode } from '../types';

interface DemoContentProps {
  onSelectMode: (mode: PreloaderMode) => void;
  currentMode: PreloaderMode;
}

const modes: { id: PreloaderMode; label: string; description: string }[] = [
  { id: 'horizontal-split', label: 'Horizontal Split', description: 'Dual-axis reveal from center line outward.' },
  { id: 'vertical-split', label: 'Vertical Split', description: 'Curtain-style reveal splitting vertically.' },
  { id: 'horizontal-stairs', label: 'Horizontal Stairs', description: 'Sequential staircase effect top-to-bottom.' },
  { id: 'vertical-stairs', label: 'Vertical Stairs', description: 'Sequential staircase effect left-to-right.' },
  { id: 'slash', label: 'Slash', description: 'Diagonal-style delay offset on vertical strips.' },
  { id: 'lattice', label: 'Lattice', description: 'Interlaced alternating direction columns.' },
  { id: 'double-stairs', label: 'Double Stairs (Mirror)', description: 'Dual-direction mirrored staircase.' },
  { id: 'double-stairs-uni', label: 'Double Stairs (Uni)', description: 'Dual-direction synchronized staircase.' },
  { id: 'pixel', label: 'Pixel', description: 'Retro pixel-style randomized grid reveal.' },
  { id: 'pixel-wave', label: 'Pixel Wave', description: 'High-density pixel grid with diagonal wave reveal.' },
  { id: 'pixel-spiral', label: 'Pixel Spiral', description: 'Circular swirling reveal from center outward.' },
  { id: 'vortex', label: 'Vortex Flow', description: 'Fluid spiral animation simulating a liquid drain effect.' },
  { id: 'curtain-shred', label: 'Curtain Shred', description: 'High-speed randomized vertical strip glitch.' },
  { id: 'quad-split', label: 'Quad Split', description: 'Cinematic 4-panel diagonal expansion.' },
];

export const DemoContent: React.FC<DemoContentProps> = ({ onSelectMode, currentMode }) => {
  return (
    <div className="w-full min-h-screen bg-black text-white pt-32 px-6 md:px-12 selection:bg-white/20">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-20 flex flex-col items-center text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
          <span className="text-[10px] uppercase tracking-widest font-medium text-white/60">v1.0.0 Stable</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Krypton UI
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
          A collection of high-fidelity transition primitives designed for the modern web. 
          Fluid, performant, and cinematic.
        </p>
      </motion.div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32 max-w-7xl mx-auto">
        {modes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + (index * 0.05), ease: "easeOut" }}
            onClick={() => onSelectMode(mode.id)}
            className={`
              relative aspect-[4/3] rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer group overflow-hidden
              ${currentMode === mode.id 
                ? 'bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.1)]' 
                : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10'
              }
            `}
          >
             {/* Gradient Glow for non-active cards */}
             {currentMode !== mode.id && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
             )}

            <div className="flex justify-between items-start z-10">
              <span className={`font-mono text-[10px] tracking-widest opacity-40`}>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentMode === mode.id ? 'bg-black' : 'bg-white/20 group-hover:bg-white'}`} />
            </div>
            
            <div className="space-y-3 z-10">
              <h3 className="text-xl font-semibold tracking-tight">{mode.label}</h3>
              <p className={`text-sm leading-relaxed ${currentMode === mode.id ? 'text-black/60' : 'text-white/40'}`}>
                {mode.description}
              </p>
            </div>

            {/* Apple-style corner arrow */}
            <div className={`absolute bottom-8 right-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 ${currentMode === mode.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer info */}
       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="pb-12 text-center"
      >
        <p className="text-white/20 text-xs font-medium tracking-widest uppercase">Designed in California</p>
      </motion.div>
    </div>
  );
};

export default DemoContent;
