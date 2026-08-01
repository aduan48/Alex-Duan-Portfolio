import React, { useState, useEffect } from 'react'
import carousel1 from '../colby_portfolio/slide-1.webp'
import carousel2 from '../ephemeral_portfolio/slide-1.webp'
import carousel3 from '../colby_portfolio/slide-8.webp'
import carousel4 from '../ephemeral_portfolio/slide-4.webp'
import carousel5 from '../colby_portfolio/slide-2.webp'
import carousel6 from '../ephemeral_portfolio/slide-12.webp'
import carousel7 from '../colby_portfolio/slide-4.webp'
import carousel8 from '../ephemeral_portfolio/slide-3.webp'

import '../styles/Carousel.css'


/**
 * 
 * @returns A animating infinte scrolling photo crousel
 */
function Carousel() {

  const [isMounted, setIsMounted] = useState(false); 

  // This runs the moment the user lands on the page, forcing a clean start
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // Cleans up when they leave
  }, []);

  return (
    <>
    <div className='carousel'>
        {/*  The animation class is only added AFTER mounting is confirmed */}
        <div className={`group ${isMounted ? 'animate' : ''}`}>
            <img src={carousel1} alt='carousel1' className='card' />
            <img src={carousel2} alt='carousel2' className='card' />
            <img src={carousel3} alt='carousel3' className='card' />
            <img src={carousel4} alt='carousel4' className='card' />
            <img src={carousel5} alt='carousel5' className='card' />
            <img src={carousel6} alt='carousel6' className='card' />
            <img src={carousel7} alt='carousel7' className='card' />
            <img src={carousel8} alt='carousel8' className='card' />
        </div>

        {/* this second acoursle allows for teh inifnnte illusion to work without it looking snappy */}
        <div aria-hidden className={`group ${isMounted ? 'animate' : ''}`}>
            <img src={carousel1} alt='carousel1' className='card' />
            <img src={carousel2} alt='carousel2' className='card' />
            <img src={carousel3} alt='carousel3' className='card' />
            <img src={carousel4} alt='carousel4' className='card' />
            <img src={carousel5} alt='carousel5' className='card' />
            <img src={carousel6} alt='carousel6' className='card' />
            <img src={carousel7} alt='carousel7' className='card' />
            <img src={carousel8} alt='carousel8' className='card' />
        </div>
    </div>
    </>
  )
}

export default Carousel