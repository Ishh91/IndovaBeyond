import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';

// How far the zoom out goes
const EXIT_TO = 0.72; // clean, centered zoom out to 72%
const EXIT_DIM = 0.25; // soft dimming

interface ScrollZoomProps {
  children: React.ReactNode;
  enterFrom?: number;
  exitTo?: number;
}

export const ScrollZoom: React.FC<ScrollZoomProps> = ({
  children,
  exitTo = EXIT_TO,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Unified scroll progress across the section's entry and exit lifecycle
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.25,
    restDelta: 0.001,
  });

  // Smooth physical lifecycle:
  // 0.0 -> 0.18: Enters from bottom (scale 0.98 -> 1.0, opacity 0.88 -> 1.0, lift 25px -> 0px)
  // 0.18 -> 0.75: Fully crisp and clear in viewport (scale 1.0, opacity 1.0)
  // 0.75 -> 1.0: Zooms out as it scrolls out top (scale 1.0 -> exitTo, opacity 1.0 -> EXIT_DIM)
  const scale = useTransform(smoothProgress, [0, 0.18, 0.75, 1], [0.98, 1, 1, exitTo]);
  const opacity = useTransform(smoothProgress, [0, 0.14, 0.8, 1], [0.88, 1, 1, EXIT_DIM]);
  const y = useTransform(smoothProgress, [0, 0.18, 0.75, 1], [25, 0, 0, 45]);

  if (reduceMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <div ref={ref} className="[overflow-x:clip] relative">
      <motion.div
        style={{
          scale,
          opacity,
          y,
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
