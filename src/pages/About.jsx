import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FluidCanvas from '../components/FluidCanvas';
import transition from '../transitionGallery'
import '../styles/About.css';

function About() {
  return (
    <div className='About'>
         <FluidCanvas className = "gradient-canvas"/>
      
    </div>
  )
}

export default transition(About)
