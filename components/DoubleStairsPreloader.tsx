import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const COLUMNS = 5;

const expandVariants = {
  initial: (i: number) => ({
    y: i % 2 === 0 ? "-100%" : "100%",
  }),
  enter: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05,
    },
  }),
  exit: (i: number) => ({
    y: i % 2 === 0 ? "100%" : "-100%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05,
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
    y: -20,
    transition: { duration: 0.3 }
  }
};

export const DoubleStairsPreloader: React.FC = () => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex h-screen w-screen cursor-wait pointer-events-none"
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {[...Array(COLUMNS)].map((_, i) => (
        <motion.div
          key={i}
          variants={expandVariants}
          custom={i}
          className="relative h-full flex-1 bg-neutral-900 border-r border-neutral-800 last:border-r-0"
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

export default DoubleStairsPreloader;
