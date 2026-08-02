import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PreloaderMode } from '../types';

interface PreloaderProps {
  mode?: PreloaderMode;
}

// ----------------------------------------------------------------------
// ANIMATION VARIANTS & CONFIG
// ----------------------------------------------------------------------

const EASING = [0.83, 0, 0.17, 1]; // Smoother, punchy ease
const STRIPS = 8;
const CENTER_OFFSET = (STRIPS - 1) / 2;

const textVariants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.4, delay: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// ----------------------------------------------------------------------
// COMPONENT RENDERERS
// ----------------------------------------------------------------------

const HorizontalSplit = () => {
  const leftVariants = {
    initial: { x: "-105%" },
    enter: (i: number) => ({
      x: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
    exit: (i: number) => ({
      x: "-105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
  };

  const rightVariants = {
    initial: { x: "105%" },
    enter: (i: number) => ({
      x: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
    exit: (i: number) => ({
      x: "105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
  };

  return (
    <div className="flex flex-col w-full h-full">
      {[...Array(STRIPS)].map((_, i) => (
        <div key={i} className="relative w-full flex-1 flex overflow-hidden">
          <motion.div variants={leftVariants} custom={i} className="h-full w-1/2 bg-white" />
          <motion.div variants={rightVariants} custom={i} className="h-full w-1/2 bg-white" />
        </div>
      ))}
    </div>
  );
};

const VerticalSplit = () => {
  const topVariants = {
    initial: { y: "-105%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
    exit: (i: number) => ({
      y: "-105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
  };

  const bottomVariants = {
    initial: { y: "105%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
    exit: (i: number) => ({
      y: "105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
  };

  return (
    <div className="flex flex-row w-full h-full">
      {[...Array(STRIPS)].map((_, i) => (
        <div key={i} className="relative h-full flex-1 flex flex-col overflow-hidden">
          <motion.div variants={topVariants} custom={i} className="w-full h-1/2 bg-white" />
          <motion.div variants={bottomVariants} custom={i} className="w-full h-1/2 bg-white" />
        </div>
      ))}
    </div>
  );
};

const Slash = () => {
  const slashVariants = {
    initial: { y: "-105%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.9, ease: EASING, delay: 0.05 * i }
    }),
    exit: (i: number) => ({
      y: "105%",
      transition: { duration: 0.9, ease: EASING, delay: 0.05 * i }
    }),
  };

  return (
    <div className="flex flex-row w-full h-full">
      {[...Array(STRIPS)].map((_, i) => (
        <motion.div
          key={i}
          variants={slashVariants}
          custom={i}
          className="relative h-full flex-1 bg-white"
        />
      ))}
    </div>
  );
};

const Lattice = () => {
  const latticeVariants = {
    initial: (i: number) => ({ 
      y: i % 2 === 0 ? "-105%" : "105%" 
    }),
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
    exit: (i: number) => ({
      y: i % 2 === 0 ? "-105%" : "105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
  };

  return (
    <div className="flex flex-row w-full h-full">
      {[...Array(STRIPS)].map((_, i) => (
        <motion.div
          key={i}
          variants={latticeVariants}
          custom={i}
          className="relative h-full flex-1 bg-white"
        />
      ))}
    </div>
  );
};

const HorizontalStairs = () => {
  const variants = {
    initial: { x: "-105%" },
    enter: (i: number) => ({
      x: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
    exit: (i: number) => ({
      x: "105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
  };

  return (
    <div className="flex flex-col w-full h-full">
      {[...Array(STRIPS)].map((_, i) => (
        <motion.div
          key={i}
          variants={variants}
          custom={i}
          className="relative w-full flex-1 bg-white"
        />
      ))}
    </div>
  );
};

const VerticalStairs = () => {
  const variants = {
    initial: { y: "-105%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
    exit: (i: number) => ({
      y: "105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
  };

  return (
    <div className="flex flex-row w-full h-full">
      {[...Array(STRIPS)].map((_, i) => (
        <motion.div
          key={i}
          variants={variants}
          custom={i}
          className="relative h-full flex-1 bg-white"
        />
      ))}
    </div>
  );
};

const DoubleStairs = () => {
  const topVariants = {
    initial: { y: "-105%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i } 
    }),
    exit: (i: number) => ({
      y: "-105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
  };

  const bottomVariants = {
    initial: { y: "105%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * (STRIPS - 1 - i) } 
    }),
    exit: (i: number) => ({
      y: "105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * (STRIPS - 1 - i) }
    }),
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full h-1/2 overflow-hidden">
        {[...Array(STRIPS)].map((_, i) => (
          <motion.div
            key={`top-${i}`}
            variants={topVariants}
            custom={i}
            className="relative h-full flex-1 bg-white"
          />
        ))}
      </div>
      <div className="flex flex-row w-full h-1/2 overflow-hidden">
        {[...Array(STRIPS)].map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            variants={bottomVariants}
            custom={i}
            className="relative h-full flex-1 bg-white"
          />
        ))}
      </div>
    </div>
  );
};

const DoubleStairsUni = () => {
  const topVariants = {
    initial: { y: "-105%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i } 
    }),
    exit: (i: number) => ({
      y: "-105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
  };

  const bottomVariants = {
    initial: { y: "105%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i } 
    }),
    exit: (i: number) => ({
      y: "105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full h-1/2 overflow-hidden">
        {[...Array(STRIPS)].map((_, i) => (
          <motion.div
            key={`top-uni-${i}`}
            variants={topVariants}
            custom={i}
            className="relative h-full flex-1 bg-white"
          />
        ))}
      </div>
      <div className="flex flex-row w-full h-1/2 overflow-hidden">
        {[...Array(STRIPS)].map((_, i) => (
          <motion.div
            key={`bottom-uni-${i}`}
            variants={bottomVariants}
            custom={i}
            className="relative h-full flex-1 bg-white"
          />
        ))}
      </div>
    </div>
  );
};

const Pixel = () => {
  const COLUMNS = 10;
  const ROWS = 8; 
  
  const [randomDelays] = useState(() => 
    Array.from({ length: COLUMNS * ROWS }, () => Math.random() * 0.4)
  );

  const variants = {
    initial: { opacity: 0, scale: 0 },
    enter: (i: number) => ({
      opacity: 1, 
      scale: 1.05, 
      transition: { duration: 0.4, delay: randomDelays[i] || 0 }
    }),
    exit: (i: number) => ({
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3, delay: randomDelays[i] || 0 }
    })
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
      {[...Array(COLUMNS * ROWS)].map((_, i) => (
        <motion.div
          key={i}
          variants={variants}
          custom={i}
          className="w-full h-full bg-white"
        />
      ))}
    </div>
  );
};

const PixelWave = () => {
  const COLUMNS = 12; 
  const ROWS = 9; 
  
  const getDelay = (i: number) => {
    const x = i % COLUMNS;
    const y = Math.floor(i / COLUMNS);
    return (x + y) * 0.05; 
  };

  const variants = {
    initial: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
    enter: (i: number) => ({
      opacity: 1, 
      scale: 1.05,
      filter: "blur(0px)",
      transition: { duration: 0.5, delay: getDelay(i) * 0.5 }
    }),
    exit: (i: number) => ({
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.3, delay: getDelay(i) * 0.3 }
    })
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
      {[...Array(COLUMNS * ROWS)].map((_, i) => (
        <motion.div
          key={`px-wave-${i}`}
          variants={variants}
          custom={i}
          className="w-full h-full bg-white"
        />
      ))}
    </div>
  );
};

const PixelSpiral = () => {
  const COLUMNS = 10;
  const ROWS = 8; 
  const CX = (COLUMNS - 1) / 2;
  const CY = (ROWS - 1) / 2;

  const getDelay = (i: number) => {
    const x = i % COLUMNS;
    const y = Math.floor(i / COLUMNS);
    
    // Calculate polar coordinates roughly
    const dx = x - CX;
    const dy = y - CY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Angle normalized 0-1
    let angle = Math.atan2(dy, dx); 
    
    return distance * 0.05 + (angle + Math.PI) * 0.05;
  };

  const variants = {
    initial: { opacity: 0, scale: 0.5, rotate: 15 },
    enter: (i: number) => ({
      opacity: 1, 
      scale: 1.05,
      rotate: 0,
      transition: { duration: 0.5, delay: getDelay(i) }
    }),
    exit: (i: number) => ({
      opacity: 0,
      scale: 0,
      rotate: -15,
      transition: { duration: 0.4, delay: getDelay(i) * 0.5 }
    })
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
      {[...Array(COLUMNS * ROWS)].map((_, i) => (
        <motion.div
          key={`px-spiral-${i}`}
          variants={variants}
          custom={i}
          className="w-full h-full bg-white origin-center"
        />
      ))}
    </div>
  );
};

const Vortex = () => {
  const COLUMNS = 15;
  const ROWS = 10;
  const TOTAL = COLUMNS * ROWS;
  const CX = (COLUMNS - 1) / 2;
  const CY = (ROWS - 1) / 2;

  // Calculate delays with a "water flow" spiral logic
  const [delays] = useState(() => {
    return Array.from({ length: TOTAL }, (_, i) => {
      const x = i % COLUMNS;
      const y = Math.floor(i / COLUMNS);
      const dx = x - CX;
      const dy = y - CY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx); // -PI to PI
      
      // Normalize angle 0 to 2PI for smooth continuous spiral
      const normAngle = angle < 0 ? angle + 2 * Math.PI : angle;

      // Spiral equation: Delay increases with distance and angle (winding)
      // This creates a flowing liquid vortex effect
      return (dist * 0.06) + (normAngle * 0.08);
    });
  });

  const variants = {
    initial: { scale: 0, opacity: 0, borderRadius: "100%" },
    enter: (i: number) => ({
      scale: 1,
      opacity: 1,
      borderRadius: "0%",
      transition: {
        duration: 0.6,
        delay: delays[i] * 0.5,
        ease: [0.25, 1, 0.5, 1] // Fluid ease
      }
    }),
    exit: (i: number) => ({
      scale: 0,
      opacity: 0,
      borderRadius: "100%",
      transition: {
        duration: 0.5,
        delay: delays[i] * 0.4, 
        ease: [0.5, 0, 0.75, 0] // Snappier exit ease
      }
    })
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
      {[...Array(TOTAL)].map((_, i) => (
        <motion.div
          key={`vortex-${i}`}
          variants={variants}
          custom={i}
          className="w-full h-full bg-white origin-center"
        />
      ))}
    </div>
  );
};

const CurtainShred = () => {
  const SHRED_STRIPS = 32; // Higher density
  
  const [randomDelays] = useState(() => 
    Array.from({ length: SHRED_STRIPS }, () => Math.random() * 0.3)
  );

  const variants = {
    initial: { y: "-105%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: randomDelays[i] || 0 }
    }),
    exit: (i: number) => ({
      y: "-105%",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: randomDelays[i] || 0 }
    }),
  };

  return (
    <div className="flex flex-row w-full h-full">
      {[...Array(SHRED_STRIPS)].map((_, i) => (
        <motion.div
          key={`shred-${i}`}
          variants={variants}
          custom={i}
          className="relative h-full flex-1 bg-white"
        />
      ))}
    </div>
  );
};

const QuadSplit = () => {
  const variants = {
    initial: (custom: {x: string, y: string}) => ({ x: custom.x, y: custom.y }),
    enter: { 
      x: "0%", 
      y: "0%",
      transition: { duration: 0.9, ease: EASING }
    },
    exit: (custom: {x: string, y: string}) => ({ 
      x: custom.x, 
      y: custom.y,
      transition: { duration: 0.9, ease: EASING }
    }),
  };

  return (
    <div className="relative w-full h-full">
      {/* Top Left */}
      <motion.div 
        custom={{x: "-100%", y: "-100%"}} 
        variants={variants} 
        className="absolute top-0 left-0 w-1/2 h-1/2 bg-white" 
      />
      {/* Top Right */}
      <motion.div 
        custom={{x: "100%", y: "-100%"}} 
        variants={variants} 
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-white" 
      />
      {/* Bottom Left */}
      <motion.div 
        custom={{x: "-100%", y: "100%"}} 
        variants={variants} 
        className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white" 
      />
      {/* Bottom Right */}
      <motion.div 
        custom={{x: "100%", y: "100%"}} 
        variants={variants} 
        className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-white" 
      />
    </div>
  );
};

// ----------------------------------------------------------------------
// MAIN PRELOADER
// ----------------------------------------------------------------------

const Preloader: React.FC<PreloaderProps> = ({ mode = 'horizontal-split' }) => {
  
  const renderContent = () => {
    switch(mode) {
      case 'vertical-split': return <VerticalSplit />;
      case 'slash': return <Slash />;
      case 'lattice': return <Lattice />;
      case 'horizontal-stairs': return <HorizontalStairs />;
      case 'vertical-stairs': return <VerticalStairs />;
      case 'double-stairs': return <DoubleStairs />;
      case 'double-stairs-uni': return <DoubleStairsUni />;
      case 'pixel': return <Pixel />;
      case 'pixel-wave': return <PixelWave />;
      case 'pixel-spiral': return <PixelSpiral />;
      case 'vortex': return <Vortex />;
      case 'curtain-shred': return <CurtainShred />;
      case 'quad-split': return <QuadSplit />;
      case 'horizontal-split': 
      default: 
        return <HorizontalSplit />;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col h-screen w-screen pointer-events-none"
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {/* Background/Strips Container */}
      <div className="absolute inset-0 w-full h-full z-10">
        {renderContent()}
      </div>

      {/* Loading Text & Bar - High Z-Index to ensure visibility */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-20"
        variants={textVariants}
      >
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tighter uppercase font-mono">
            {mode.replace(/-/g, ' ')}
          </h1>
          <div className="h-1 w-32 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
          <span className="text-[10px] font-mono uppercase text-black/50 tracking-widest mt-1">
            Loading
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;