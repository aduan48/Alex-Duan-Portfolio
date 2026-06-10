import React from 'react';
import { motion } from 'framer-motion';

const transition = (OgComponent) => {
  // Path definitions for the liquid flow
  const initialPath = `M0 0 L100 0 L100 100 Q50 100 0 100 Z`; // Full screen covered
  const targetPath =  `M0 0 L100 0 L100 0   Q50 0   0 0   Z`; // Empties downward out of view
  const exitPath =    `M0 0 L100 0 L100 100 Q50 140 0 100 Z`; // Liquid drops from top to cover screen again

  const curveTransition = {
    duration: 0.8,
    ease: [0.76, 0, 0.24, 1],
  };

  return (props) => (
    <>
      {/* Page Content Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <OgComponent {...props} />
      </motion.div>

      {/* Fullscreen SVG Overlay */}
      <svg className="liquid-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          fill="#111111"
          initial={{ d: initialPath }}
          animate={{ d: targetPath }}
          exit={{ d: exitPath }}
          transition={curveTransition}
        />
      </svg>
    </>
  );
};

export default transition;