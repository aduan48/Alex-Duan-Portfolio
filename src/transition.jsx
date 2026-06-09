import React from 'react';
import { motion } from 'framer-motion';

const calculateRandomBlockDelay = (rowIndex, totalRows) => {
    const blockDelay = Math.random() * 0.5;
    const rowDelay = (totalRows - rowIndex -1) * 0.05;
    return blockDelay + rowDelay;
}

const transition = (OgComponent) => {
  return () => (
    <>
      {/* Pass props through to ensure the wrapped component works perfectly */}
      <OgComponent/>
      
      <div className='blocks-container transition-in'>
        {Array.from({length: 10}).map((_, rowIndex) => (
            <div className = 'row' key = {rowIndex}>
                 {Array.from({length: 11}).map((_, blockIndex) => (
                    <motion.div
                        key = {blockIndex}
                        className='block'
                    ></motion.div>
                 ))}
            </div>
        ))}
      </div>
    </>
  );
};

export default transition;