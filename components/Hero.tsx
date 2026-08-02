import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-12 bg-neutral-950 overflow-hidden">
      
      {/* Background Gradient Spot */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="text-neutral-400 text-lg md:text-xl mb-6 font-light"
        >
          Re-engineered Digital Experiences
        </motion.p>
        
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 2.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-5xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tighter"
          >
            DOUBLE
          </motion.h1>
        </div>
        
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 2.9, ease: [0.76, 0, 0.24, 1] }}
            className="text-5xl md:text-8xl lg:text-9xl font-bold text-neutral-500 leading-[0.9] tracking-tighter"
          >
            STAIRS
          </motion.h1>
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 3.2 }}
           className="mt-12 flex flex-wrap gap-4"
        >
          <button className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors">
            Explore Project
          </button>
          <button className="px-8 py-3 border border-neutral-700 text-white font-medium rounded-full hover:bg-neutral-900 transition-colors">
            View Source
          </button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-12 right-6 md:right-12 text-right text-xs text-neutral-600 uppercase tracking-widest"
      >
        <p>Scroll to Explore</p>
        <p className="mt-2 animate-bounce">↓</p>
      </motion.div>
    </section>
  );
};

export default Hero;
