// transitionGallery.jsx
import React from 'react';
import { motion } from 'framer-motion';

const transitionGallery = (OgComponent) => {
  return (props) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <OgComponent {...props} />
    </motion.div>
  );
};

export default transitionGallery;