import React from 'react';
import { motion } from 'framer-motion';

// Number of rows for the split stairs effect
// Odd number ensures a perfect center row
const ROWS = 11;

// Left half animation: Slides in from left, exits to left
const leftVariants = {
  initial: { 
    x: "-100%", 
  },
  enter: (i: number) => ({
    x: "0%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * Math.abs(i - Math.floor(ROWS / 2)), // Center enters first
    },
  }),
  exit: (i: number) => ({
    x: "-100%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * Math.abs(i - Math.floor(ROWS / 2)), // Center leaves first
    },
  }),
};

// Right half animation: Slides in from right, exits to right
const rightVariants = {
  initial: { 
    x: "100%", 
  },
  enter: (i: number) => ({
    x: "0%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * Math.abs(i - Math.floor(ROWS / 2)),
    },
  }),
  exit: (i: number) => ({
    x: "100%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * Math.abs(i - Math.floor(ROWS / 2)),
    },
  }),
};

// Text variants for the center loading indicator
const textVariants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const SplitStairsPreloader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col h-screen w-screen cursor-wait pointer-events-none"
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {/* 
        Render horizontal rows.
        Each row is split into two halves (left and right)
        that slide in from opposite sides — dual-direction staircase reveal.
      */}
      {[...Array(ROWS)].map((_, i) => (
        <div
          key={i}
          className="relative w-full flex-1 flex"
        >
          {/* Left Half — slides in/out from the left */}
          <motion.div
            variants={leftVariants}
            custom={i}
            className="h-full w-1/2 bg-neutral-900 relative border-r border-neutral-800/50"
          >
            <div className="absolute inset-0 bg-white/[0.01]" />
          </motion.div>
          
          {/* Right Half — slides in/out from the right */}
          <motion.div
            variants={rightVariants}
            custom={i}
            className="h-full w-1/2 bg-neutral-900 relative"
          >
            <div className="absolute inset-0 bg-white/[0.01]" />
          </motion.div>
        </div>
      ))}

      {/* Center Content / Loading Text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
        variants={textVariants}
      >
        <div className="flex flex-col items-center gap-2 overflow-hidden">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mix-blend-difference">
            LOADING
          </h1>
          <div className="h-1 w-24 bg-neutral-800 rounded-full overflow-hidden mt-4">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplitStairsPreloader;
