import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FluidCanvas from '../components/FluidCanvas';
import transition from '../transitionGallery'
import '../styles/Home.css';
import { Link } from 'react-router-dom'

function Home() {
  const titleRef = useRef(null);

  useEffect(() => {
    // 1. ANIMATE IN: Trigger reveal when page loads
    gsap.to(titleRef.current, {
      y: "0%",
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2 // let the page transition settle slightly first
    });

    // 2. ANIMATE OUT: Trigger unreveal when leaving the page
    return () => {
      // This cleanup/unmount phase runs right as the component begins to swap
      gsap.to(titleRef.current, {
        y: "-100%", // Slides out the top edge for a modern editorial look
        duration: 0.8,
        ease: "power4.in",
      });
    };
  }, []);

  return (
    <div className='Home'>
      {/* Imported Canvas Component */}
      <FluidCanvas className = "gradient-canvas"/>

      <div className='home-logo'>
        <Link to = "/projects">
          <h1 ref={titleRef}>ALEX DUAN</h1>
        </Link>
      </div>
      
      <div className='home-footer'>
        <p>CREATED IN 2026</p>
        <p>ASPIRING PRODUCT MANAGER</p>
      </div>

    </div>
  );
}

export default transition(Home);