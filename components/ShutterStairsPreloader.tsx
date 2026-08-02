import React from 'react';
import { motion } from 'framer-motion';

const ROWS = 11;

const shutterVariants = {
  initial: { 
    x: "-100%",
  },
  enter: (i: number) => ({
    x: "0%",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * Math.abs(i - Math.floor(ROWS / 2)),
    },
  }),
  exit: (i: number) => ({
    x: "100%",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * Math.abs(i - Math.floor(ROWS / 2)),
    },
  }),
};

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

export const ShutterStairsPreloader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col h-screen w-screen cursor-wait pointer-events-none"
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {[...Array(ROWS)].map((_, i) => (
        <motion.div
          key={i}
          variants={shutterVariants}
          custom={i}
          className="relative w-full flex-1 bg-neutral-900 border-b border-neutral-800 last:border-b-0"
        >
          <div className="absolute inset-0 bg-white/[0.02]" />
        </motion.div>
      ))}

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

export default ShutterStairsPreloader;
