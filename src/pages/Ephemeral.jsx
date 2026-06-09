import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/Ephemeral.css';
import { Link } from 'react-router-dom'
import transition from '../transition';

function Ephemeral() {
  // 1. Setup DOM Element References
  const sliderRef = useRef(null);
  const wheelRef = useRef(null);
  const titleRef = useRef(null);

  // 2. Constants Configuration
  const totalSlides = 12; // Updated to match your new titles array length
  const endScale = 5;
  const slideWidth = window.innerWidth * 0.45;
  const viewportCenter = window.innerWidth / 2;
  const isMobile = window.innerWidth < 1000;
  const totalCreatedSlides = totalSlides * 3;

  const slideTitles = [
    "Phased Logo", "Mountain Seductive", "Blocky Typography", "Pink Seduction",
    "Party Captured", "Red Green Cover", "Purple Yellow Cover", "Bold Snow Day",
    "Phased Logo BLK", "Icy Whispers", "Blue Oragne Cover", "Blocky Typography INV",
  ];

  // 3. Animation State Tracking Refs (Prevents infinite state re-renders)
  const animationState = useRef({
    currentX: 0,
    targetX: 0,
    activeSlideIndex: 0,
    isScrolling: false,
    animationFrameId: null,
    scrollTimeout: null
  });

  // Calculate angles layout array for the wheel items
  const thumbnailAngles = Array.from({ length: totalSlides }).map((_, i) => {
    const angle = (i / totalSlides) * Math.PI * 2;
    const radius = isMobile ? 100 : 350;
    const x = radius * Math.cos(angle) + window.innerWidth / 2;
    const y = radius * Math.sin(angle) + window.innerHeight / 2 - 25;
    return { angle, radius, x, y };
  });

  useEffect(() => {
    const state = animationState.current;

    // --- INITIALIZE SLIDER STYLES ---
    if (sliderRef.current && wheelRef.current) {
      const slides = sliderRef.current.querySelectorAll('.slide');
      slides.forEach((slide, index) => {
        const x = index * slideWidth - slideWidth;
        gsap.set(slide, { x: x });
      });

      const centerOffset = window.innerWidth / 2 - slideWidth / 2;
      state.currentX = centerOffset;
      state.targetX = centerOffset;

      // Position the thumbnails immediately
      const thumbnails = wheelRef.current.querySelectorAll('.thumbnail-item');
      thumbnails.forEach((thumbnail, i) => {
        const item = thumbnailAngles[i];
        gsap.set(thumbnail, {
          x: item.x,
          y: item.y,
          transformOrigin: "center center"
        });
      });
    }

    // --- WHEEL / SCROLL INTERACTION LOOP ---
    const handleScroll = (e) => {
      const scrollIntensity = e.deltaY || e.detail || e.wheelDelta * -1;
      state.targetX -= scrollIntensity * 1;

      state.isScrolling = true;
      clearTimeout(state.scrollTimeout);

      state.scrollTimeout = setTimeout(() => {
        state.isScrolling = false;
      }, 150);
    };

    // --- 60FPS TICK ANIMATION SYSTEM ---
    const animate = () => {
      state.currentX += (state.targetX - state.currentX) * 0.1;

      const totalWidth = totalSlides * slideWidth;
      if (state.currentX > 0) {
        state.currentX -= totalWidth;
        state.targetX -= totalWidth;
      } else if (state.currentX < -totalWidth) {
        state.currentX += totalWidth;
        state.targetX += totalWidth;
      }

      let centerSlideIndex = 0;
      let closestToCenter = Infinity;
      
      if (sliderRef.current) {
        const slides = sliderRef.current.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
          const x = index * slideWidth + state.currentX;
          gsap.set(slide, { x: x });

          const slideCenterX = x + slideWidth / 2;
          const distanceFromCenter = Math.abs(slideCenterX - viewportCenter);

          const outerDistance = slideWidth * 3;
          const progress = Math.min(distanceFromCenter / outerDistance, 1);

          // Easing equation calculations
          const easedProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          const scale = 1 + easedProgress * (endScale - 1);
          const img = slide.querySelector('img');
          if (img) gsap.set(img, { scale: scale });

          if (distanceFromCenter < closestToCenter) {
            closestToCenter = distanceFromCenter;
            centerSlideIndex = index % totalSlides;
          }
        });
      }

      const slideProgress = Math.abs(state.currentX) / slideWidth;
      const newActiveSlideIndex = Math.floor(slideProgress) % totalSlides;

      if (newActiveSlideIndex !== state.activeSlideIndex) {
        state.activeSlideIndex = newActiveSlideIndex;
      }

      if (titleRef.current) {
        titleRef.current.textContent = slideTitles[centerSlideIndex];
      }

      // --- ANIMATE THUMBNAIL WHEEL RADIAL SHIFTS ---
      if (wheelRef.current) {
        const exactSlideProgress = Math.abs(state.currentX) / slideWidth;
        const currentRotationAngle = -(exactSlideProgress * (360 / totalSlides)) + 90;
        const thumbnails = wheelRef.current.querySelectorAll('.thumbnail-item');

        thumbnails.forEach((thumbnail) => {
          const baseAngle = parseFloat(thumbnail.getAttribute('data-angle'));
          const radius = isMobile ? 150 : 350;
          const currentAngle = baseAngle + (currentRotationAngle * Math.PI) / 180;

          const x = radius * Math.cos(currentAngle) + window.innerWidth / 2;
          const y = radius * Math.sin(currentAngle) + window.innerHeight / 2 - 25;

          gsap.set(thumbnail, {
            x: x,
            y: y,
            rotation: 0,
            transformOrigin: "center center"
          });
        });
      }

      state.animationFrameId = requestAnimationFrame(animate);
    };

    // --- SETUP GLOBAL APP EVENTS ---
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("DOMMouseScroll", handleScroll, { passive: false });
    
    // Begin layout loop
    state.animationFrameId = requestAnimationFrame(animate);

    // --- CLEANUP ON ROUTE DISMOUNT ---
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("DOMMouseScroll", handleScroll);
      cancelAnimationFrame(state.animationFrameId);
      clearTimeout(state.scrollTimeout);
    };
  }, [slideWidth]);

  return (
    <div>

      <div className='back'> 
        <Link to="/work"> BACK </Link>
      </div>

      <div className='slider' ref={sliderRef}>
        {/* Dynamic Title Target */}
        <p className='slide-title' ref={titleRef}>Ephemeral</p>

        {/* 3X Main Carousel Slides Generation Loop */}
        {Array.from({ length: totalCreatedSlides }).map((_, i) => {
          const imageNumber = (i % totalSlides) + 1;
          const imageUrl = new URL(`../ephemeral_portfolio/slide-${imageNumber}.webp`, import.meta.url).href;
          
          return (
            <div className="slide" key={`slide-${i}`}>
              <img src={imageUrl} alt={slideTitles[i % slideTitles.length]} />
            </div>
          );
        })}
      </div>

      {/* Radial Wheel Thumbnail Target */}
      <div className='thumbnail-wheel' ref={wheelRef}>
        {Array.from({ length: totalSlides }).map((_, i) => {
          const imageNumber = i + 1;
          const imageUrl = new URL(`../ephemeral_portfolio/slide-${imageNumber}.webp`, import.meta.url).href;
          const layout = thumbnailAngles[i];

          return (
            <div 
              className="thumbnail-item" 
              key={`thumb-${i}`}
              data-index={i}
              data-angle={layout.angle}
            >
              <img src={imageUrl} alt={`Thumb ${imageNumber}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default transition(Ephemeral);