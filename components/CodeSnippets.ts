// ----------------------------------------------------------------------
// COMMON CONFIGURATION
// Add these constants at the top of your file
// ----------------------------------------------------------------------
import { motion } from 'framer-motion';

export const COMMON_SETUP = `// ----------------------------------------------------------------------
// COMMON CONFIGURATION
// Add these constants at the top of your file
// ----------------------------------------------------------------------
import { motion } from 'framer-motion';

const EASING = [0.83, 0, 0.17, 1];
const STRIPS = 8; // Number of strips for split/stairs effects
const CENTER_OFFSET = (STRIPS - 1) / 2;
`;

export const CODE_SNIPPETS: Record<string, string> = {
  'horizontal-split': `/**
 * Horizontal Split
 * Description: Dual-axis reveal from center line outward.
 *
 * IMPORTANT: Delays are calculated using Math.abs(i - CENTER_OFFSET) 
 * to start the animation from the center strip and move outward.
 */
const HorizontalSplit = () => {
  const leftVariants = {
    initial: { x: "-105%" },
    enter: (i) => ({
      x: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
    exit: (i) => ({
      x: "-105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
  };

  const rightVariants = {
    initial: { x: "105%" },
    enter: (i) => ({
      x: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
    exit: (i) => ({
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
};`,

  'vertical-split': `/**
 * Vertical Split
 * Description: Curtain-style reveal splitting vertically.
 *
 * IMPORTANT: Each strip is physically divided into two motion divs (top/bottom) 
 * moving in opposite directions (y: -105% vs y: 105%).
 */
const VerticalSplit = () => {
  const topVariants = {
    initial: { y: "-105%" },
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
    exit: (i) => ({
      y: "-105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
  };

  const bottomVariants = {
    initial: { y: "105%" },
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * Math.abs(i - CENTER_OFFSET) }
    }),
    exit: (i) => ({
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
};`,

  'slash': `/**
 * Slash
 * Description: Diagonal-style delay offset on vertical strips.
 *
 * IMPORTANT: A simple linear delay based on index 'i' creates 
 * the diagonal sweep feel across vertical strips.
 */
const Slash = () => {
  const slashVariants = {
    initial: { y: "-105%" },
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.9, ease: EASING, delay: 0.05 * i }
    }),
    exit: (i) => ({
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
};`,

  'lattice': `/**
 * Lattice
 * Description: Interlaced alternating direction columns.
 *
 * IMPORTANT: We use the modulo operator (i % 2) to alternate the 
 * starting position (top vs bottom) for adjacent strips.
 */
const Lattice = () => {
  const latticeVariants = {
    initial: (i) => ({ 
      y: i % 2 === 0 ? "-105%" : "105%" 
    }),
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
    exit: (i) => ({
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
};`,

  'horizontal-stairs': `/**
 * Horizontal Stairs
 * Description: Sequential staircase effect top-to-bottom.
 *
 * IMPORTANT: Standard sequential delay. 'flex-col' is used 
 * to stack the strips vertically for a horizontal shutter effect.
 */
const HorizontalStairs = () => {
  const variants = {
    initial: { x: "-105%" },
    enter: (i) => ({
      x: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
    exit: (i) => ({
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
};`,

  'vertical-stairs': `/**
 * Vertical Stairs
 * Description: Sequential staircase effect left-to-right.
 *
 * IMPORTANT: Standard sequential delay. 'flex-row' is used 
 * to stack the strips horizontally.
 */
const VerticalStairs = () => {
  const variants = {
    initial: { y: "-105%" },
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
    exit: (i) => ({
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
};`,

  'double-stairs': `/**
 * Double Stairs (Mirror)
 * Description: Dual-direction mirrored staircase.
 *
 * IMPORTANT: The screen is split into two containers. The bottom container 
 * reverses the delay calculation (STRIPS - 1 - i) to mirror the top.
 */
const DoubleStairs = () => {
  const topVariants = {
    initial: { y: "-105%" },
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i } 
    }),
    exit: (i) => ({
      y: "-105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
  };

  const bottomVariants = {
    initial: { y: "105%" },
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * (STRIPS - 1 - i) } 
    }),
    exit: (i) => ({
      y: "105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * (STRIPS - 1 - i) }
    }),
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full h-1/2 overflow-hidden">
        {[...Array(STRIPS)].map((_, i) => (
          <motion.div
            key={\`top-\${i}\`}
            variants={topVariants}
            custom={i}
            className="relative h-full flex-1 bg-white"
          />
        ))}
      </div>
      <div className="flex flex-row w-full h-1/2 overflow-hidden">
        {[...Array(STRIPS)].map((_, i) => (
          <motion.div
            key={\`bottom-\${i}\`}
            variants={bottomVariants}
            custom={i}
            className="relative h-full flex-1 bg-white"
          />
        ))}
      </div>
    </div>
  );
};`,

  'double-stairs-uni': `/**
 * Double Stairs (Uni)
 * Description: Dual-direction synchronized staircase.
 *
 * IMPORTANT: Top and bottom halves share the same delay logic (0.05 * i)
 * creating a synchronized, uniform wave effect.
 */
const DoubleStairsUni = () => {
  const topVariants = {
    initial: { y: "-105%" },
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i } 
    }),
    exit: (i) => ({
      y: "-105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
  };

  const bottomVariants = {
    initial: { y: "105%" },
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i } 
    }),
    exit: (i) => ({
      y: "105%",
      transition: { duration: 0.8, ease: EASING, delay: 0.05 * i }
    }),
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full h-1/2 overflow-hidden">
        {[...Array(STRIPS)].map((_, i) => (
          <motion.div
            key={\`top-uni-\${i}\`}
            variants={topVariants}
            custom={i}
            className="relative h-full flex-1 bg-white"
          />
        ))}
      </div>
      <div className="flex flex-row w-full h-1/2 overflow-hidden">
        {[...Array(STRIPS)].map((_, i) => (
          <motion.div
            key={\`bottom-uni-\${i}\`}
            variants={bottomVariants}
            custom={i}
            className="relative h-full flex-1 bg-white"
          />
        ))}
      </div>
    </div>
  );
};`,

  'pixel': `/**
 * Pixel
 * Description: Retro pixel-style randomized grid reveal.
 *
 * IMPORTANT: Requires a CSS Grid container. Delays are randomized 
 * for a noise/dissolve effect. Ensure container size handles the grid items.
 */
const Pixel = () => {
  const COLUMNS = 10;
  const ROWS = 8; 
  
  // Use a fixed random seed or state in real app to avoid hydration mismatch
  const [randomDelays] = React.useState(() => 
    Array.from({ length: COLUMNS * ROWS }, () => Math.random() * 0.4)
  );

  const variants = {
    initial: { opacity: 0, scale: 0 },
    enter: (i) => ({
      opacity: 1, 
      scale: 1.05, 
      transition: { duration: 0.4, delay: randomDelays[i] || 0 }
    }),
    exit: (i) => ({
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3, delay: randomDelays[i] || 0 }
    })
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateColumns: \`repeat(\${COLUMNS}, 1fr)\`, gridTemplateRows: \`repeat(\${ROWS}, 1fr)\` }}>
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
};`,

  'pixel-wave': `/**
 * Pixel Wave
 * Description: High-density pixel grid with diagonal wave reveal.
 *
 * IMPORTANT: Delays are calculated based on (x + y) coordinates. 
 * This effectively creates a diagonal wavefront traveling across the grid.
 */
const PixelWave = () => {
  const COLUMNS = 12; 
  const ROWS = 9; 
  
  const getDelay = (i) => {
    const x = i % COLUMNS;
    const y = Math.floor(i / COLUMNS);
    return (x + y) * 0.05; 
  };

  const variants = {
    initial: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
    enter: (i) => ({
      opacity: 1, 
      scale: 1.05,
      filter: "blur(0px)",
      transition: { duration: 0.5, delay: getDelay(i) * 0.5 }
    }),
    exit: (i) => ({
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.3, delay: getDelay(i) * 0.3 }
    })
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateColumns: \`repeat(\${COLUMNS}, 1fr)\`, gridTemplateRows: \`repeat(\${ROWS}, 1fr)\` }}>
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
};`,

  'pixel-spiral': `/**
 * Pixel Spiral
 * Description: Circular swirling reveal from center outward.
 *
 * IMPORTANT: Uses basic trigonometry (atan2, sqrt) to calculate delays 
 * based on angle + distance from center.
 */
const PixelSpiral = () => {
  const COLUMNS = 10;
  const ROWS = 8; 
  const CX = (COLUMNS - 1) / 2;
  const CY = (ROWS - 1) / 2;

  const getDelay = (i) => {
    const x = i % COLUMNS;
    const y = Math.floor(i / COLUMNS);
    
    // Calculate polar coordinates
    const dx = x - CX;
    const dy = y - CY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx); 
    
    return distance * 0.05 + (angle + Math.PI) * 0.05;
  };

  const variants = {
    initial: { opacity: 0, scale: 0.5, rotate: 15 },
    enter: (i) => ({
      opacity: 1, 
      scale: 1.05,
      rotate: 0,
      transition: { duration: 0.5, delay: getDelay(i) }
    }),
    exit: (i) => ({
      opacity: 0,
      scale: 0,
      rotate: -15,
      transition: { duration: 0.4, delay: getDelay(i) * 0.5 }
    })
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateColumns: \`repeat(\${COLUMNS}, 1fr)\`, gridTemplateRows: \`repeat(\${ROWS}, 1fr)\` }}>
      {[...Array(COLUMNS * ROWS)].map((_, i) => (
        <motion.div
          key={i}
          variants={variants}
          custom={i}
          className="w-full h-full bg-white origin-center"
        />
      ))}
    </div>
  );
};`,

  'vortex': `/**
 * Vortex Flow
 * Description: Fluid spiral animation simulating a liquid drain effect.
 *
 * IMPORTANT: Advanced polar coordinate math creates a fluid spiral. 
 * Normalizing angles (0 to 2PI) ensures a smooth continuous flow without gaps.
 */
const Vortex = () => {
  const COLUMNS = 15;
  const ROWS = 10;
  const TOTAL = COLUMNS * ROWS;
  const CX = (COLUMNS - 1) / 2;
  const CY = (ROWS - 1) / 2;

  // Calculate delays with a "water flow" spiral logic
  const [delays] = React.useState(() => {
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
      return (dist * 0.06) + (normAngle * 0.08);
    });
  });

  const variants = {
    initial: { scale: 0, opacity: 0, borderRadius: "100%" },
    enter: (i) => ({
      scale: 1,
      opacity: 1,
      borderRadius: "0%",
      transition: {
        duration: 0.6,
        delay: delays[i] * 0.5,
        ease: [0.25, 1, 0.5, 1] // Fluid ease
      }
    }),
    exit: (i) => ({
      scale: 0,
      opacity: 0,
      borderRadius: "100%",
      transition: {
        duration: 0.5,
        delay: delays[i] * 0.4, 
        ease: [0.5, 0, 0.75, 0]
      }
    })
  };

  return (
    <div className="w-full h-full grid" style={{ gridTemplateColumns: \`repeat(\${COLUMNS}, 1fr)\`, gridTemplateRows: \`repeat(\${ROWS}, 1fr)\` }}>
      {[...Array(TOTAL)].map((_, i) => (
        <motion.div
          key={i}
          variants={variants}
          custom={i}
          className="w-full h-full bg-white origin-center"
        />
      ))}
    </div>
  );
};`,

  'curtain-shred': `/**
 * Curtain Shred
 * Description: High-speed randomized vertical strip glitch.
 *
 * IMPORTANT: Uses a high number of strips (SHRED_STRIPS) and random delays 
 * to simulate a glitchy, digital shredding effect.
 */
const CurtainShred = () => {
  const SHRED_STRIPS = 32; // Higher density
  
  const [randomDelays] = React.useState(() => 
    Array.from({ length: SHRED_STRIPS }, () => Math.random() * 0.3)
  );

  const variants = {
    initial: { y: "-105%" },
    enter: (i) => ({
      y: "0%",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: randomDelays[i] || 0 }
    }),
    exit: (i) => ({
      y: "-105%",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: randomDelays[i] || 0 }
    }),
  };

  return (
    <div className="flex flex-row w-full h-full">
      {[...Array(SHRED_STRIPS)].map((_, i) => (
        <motion.div
          key={i}
          variants={variants}
          custom={i}
          className="relative h-full flex-1 bg-white"
        />
      ))}
    </div>
  );
};`,

  'quad-split': `/**
 * Quad Split
 * Description: Cinematic 4-panel diagonal expansion.
 *
 * IMPORTANT: Uses a 'custom' object prop to pass specific starting coordinates 
 * {x, y} to the variants for each of the 4 quadrants.
 */
const QuadSplit = () => {
  const variants = {
    initial: (custom) => ({ x: custom.x, y: custom.y }),
    enter: { 
      x: "0%", 
      y: "0%",
      transition: { duration: 0.9, ease: EASING }
    },
    exit: (custom) => ({ 
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
};`
};