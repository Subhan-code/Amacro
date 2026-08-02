import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';

export interface GsapOverlayRef {
  animate: (onMiddle: () => void, duration?: number) => void;
}

export const GsapOverlay = forwardRef<GsapOverlayRef, {}>((props, ref) => {
  const svgRef = useRef<SVGSVGElement>(null);
  // We use 3 paths for a layered effect
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Animation Constants
  const numPoints = 12; // Higher number = smoother wave
  const numPaths = 3;
  const stagger = 0.08;
  const waveNoise = 0.2; // Randomness in point movement

  // Data structure to hold the state of our wave points
  // Each path has a set of points. Values range from 100 (Bottom) to 0 (Top).
  const pointsRef = useRef<any[]>([]);
  
  // Phase flag: 
  // true = Filling up (Anchor Bottom)
  // false = Emptying up (Anchor Top)
  const isCoveringRef = useRef(true);

  useEffect(() => {
    // Initialize points state
    pointsRef.current = [];
    for (let i = 0; i < numPaths; i++) {
      const pObj: any = {};
      for (let j = 0; j < numPoints; j++) {
        pObj[`p${j}`] = 100; // Start at bottom (100%)
      }
      pointsRef.current.push(pObj);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    animate: (onMiddle, duration = 0.85) => {
      // 1. Reset and Kill previous animations
      if (tlRef.current) tlRef.current.kill();

      const tl = gsap.timeline({
        onUpdate: render, // Re-draw SVG every frame
        defaults: { ease: "power2.inOut" }
      });
      tlRef.current = tl;

      // --- PHASE 1: COVER (Upward Fill) ---
      isCoveringRef.current = true;
      
      // Reset all points to 100 (Bottom)
      pointsRef.current.forEach(pt => {
        for(let k in pt) pt[k] = 100;
      });

      // Animate points from 100 -> 0
      pointsRef.current.forEach((pt, i) => {
        const pathDelay = i * stagger;
        for (let j = 0; j < numPoints; j++) {
           // Add slight randomness to each point for liquid feel
           const randomDelay = Math.random() * waveNoise;
           tl.to(pt, {
             [`p${j}`]: 0,
             duration: duration,
           }, pathDelay + randomDelay); // Insert at absolute time
        }
      });

      // --- MIDDLE: TRIGGER THEME CHANGE ---
      // This runs after the 'cover' animation finishes (mostly).
      // We start it slightly before the absolute end to avoid gaps? 
      // No, let's append it to the end of the timeline.
      tl.call(() => {
        if (onMiddle) onMiddle();
        
        // --- PREPARE PHASE 2: REVEAL ---
        isCoveringRef.current = false; // Switch render logic to Anchor Top
        
        // Reset points to 100 immediately. 
        // Logic: 
        // Cover Mode (p=0): Full Screen.
        // Reveal Mode (p=100): Full Screen.
        // So we switch mode AND reset points simultaneously to maintain the visual "Full Screen" state.
        pointsRef.current.forEach(pt => {
           const resetObj: any = {};
           for(let k in pt) resetObj[k] = 100;
           gsap.set(pt, resetObj); // Immediate set
        });
      });

      // --- PHASE 2: REVEAL (Upward Empty) ---
      // Animate points 100 -> 0 again, but with Anchor Top logic
      const revealStartTime = tl.duration(); // Start right after middle callback
      
      pointsRef.current.forEach((pt, i) => {
        // Reverse order for reveal? Or same order? 
        // Let's keep same order (back to front layers)
        const pathDelay = i * stagger; 
        for (let j = 0; j < numPoints; j++) {
           const randomDelay = Math.random() * waveNoise;
           tl.to(pt, {
             [`p${j}`]: 0,
             duration: duration,
           }, revealStartTime + pathDelay + randomDelay);
        }
      });
    }
  }));

  const render = () => {
    for (let i = 0; i < numPaths; i++) {
        const pathEl = pathRefs.current[i];
        const pt = pointsRef.current[i];
        if (!pathEl || !pt) continue;

        const pointsArr = [];
        for (let j = 0; j < numPoints; j++) pointsArr.push(pt[`p${j}`]);

        // Build SVG Path String
        let d = "";
        
        // Logic:
        // isCovering (Anchor Bottom): M 0 100 L 0 p0 ... L 100 pN L 100 100 Z
        // !isCovering (Anchor Top):   M 0 0   L 0 p0 ... L 100 pN L 100 0   Z
        
        const startY = isCoveringRef.current ? 100 : 0;
        d += `M 0 ${startY}`; 
        
        // Start of curve (Left edge)
        // If covering: V p0 (draws line up from 100 to p0)
        // If revealing: V p0 (draws line down from 0 to p0)
        d += ` V ${pointsArr[0]}`;

        // Cubic Bezier Curves through points
        // We use a simplified strategy where control points are halfway between X coords
        const stepX = 100 / (numPoints - 1);
        
        for (let j = 0; j < numPoints - 1; j++) {
            const p1 = pointsArr[j];
            const p2 = pointsArr[j+1];
            
            const currentX = j * stepX;
            const nextX = (j + 1) * stepX;
            
            // Control Point X is mid-way
            const cpX = currentX + (stepX * 0.5);
            
            // Curve to next point
            // C cp1x cp1y, cp2x cp2y, x y
            // We keep Y flat at the control points for a "tension" effect
            d += ` C ${cpX} ${p1} ${cpX} ${p2} ${nextX} ${p2}`;
        }

        // Close Path
        d += ` V ${startY} H 0`;
        
        pathEl.setAttribute("d", d);
    }
  };

  return (
    <svg 
      ref={svgRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[100]" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
        {/* Layer 1 (Back): Lightest */}
        <path ref={(el) => { pathRefs.current[0] = el; }} fill="#52525b" style={{ opacity: 0.4 }} />
        {/* Layer 2 (Middle): Medium */}
        <path ref={(el) => { pathRefs.current[1] = el; }} fill="#27272a" style={{ opacity: 0.7 }} />
        {/* Layer 3 (Front): Darkest (Matches dark theme bg) */}
        <path ref={(el) => { pathRefs.current[2] = el; }} fill="#09090b" />
    </svg>
  );
});