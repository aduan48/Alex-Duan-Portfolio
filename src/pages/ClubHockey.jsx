import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'; // Fixed: Included missing react hook imports
import gsap from 'gsap';
import '../styles/ClubHockey.css';
import FluidCanvas from '../components/FluidCanvasBW';
import { Link } from 'react-router-dom';
import transition from '../transitionGallery';
import landing from '../colby_website/homepage_demo.mp4'
import schedule from '../colby_website/schedule_demo.mp4'
import carousel from '../colby_website/carousel_demo.png'
import mobile from '../colby_website/mobile_demo.mp4'
import identity from '../colby_website/mule_identity.png'

function ClubHockey() {


  const slideData = [
    { 
      id: 'slide-0',
      content: (
        <div className="slide-inner-content">
          <h1>Overview</h1> 
          <p><strong>STACK:  </strong>React | JavaScript | HTML5/CSS3 | Netlify | Git | Three.js | WebGL</p>
          <p>This full-stack web application, engineered for Colby Club Hockey, pairs modern React architecture with adaptive styling and 3d elements to deliver a highly responsive, on-brand digital presence. The platform features an automated serverless data pipeline, integrating Netlify Forms for serverless submission tracking alongside a custom React state engine that persistently backs up user inputs to local storage against accidental browser refreshes. Furthermore, the architecture leverages serverless backend functions to decouple raw schedule data from the client, parsing external JSON files to feed the frontend interactive rosters and game timelines dynamically.</p>

          <div className='slide-footer'>
             <p> <strong>SCROLL UP FOR NEXT SLIDE</strong></p>
          </div>

       

        </div>

        

      ),
    },
    { 
      id: 'slide-1', 
      content: (
        <div className="slide-inner-content">
              <h1>Brand Identity</h1> 
              <div className='brand-identity'>

            <p>When designing the website for Colby Club Hockey, I drew direct inspiration from the team’s identity which pairs the iconic Colby Mule logo with a crisp white and deep blue color palette. This stark, clean aesthetic influenced me to build the site with a dominant white background to evoke the pristine surface of a hockey rink, using strategic blue highlights to mimic the sharp intensity of the logo itself. By mirroring these official colors, I ensured the digital space feels instantly recognizable, professional, and deeply rooted in the team's athletic tradition.
            </p>
          
            <div className='identity-img'>
              <img src = {identity} alt = ''/>
            </div>
            </div>
        </div>
      ),
    },
    { 
      id: 'slide-2',
      content: (
        <div className="slide-inner-content">
          <h1>Landing Page</h1> 
          <p>This full-stack web application, engineered for Colby Club Hockey, pairs modern React architecture with adaptive styling to deliver a highly responsive, on-brand digital presence. The platform features an automated serverless data pipeline, integrating Netlify Forms for serverless submission tracking alongside a custom React state engine that persistently backs up user inputs to local storage against accidental browser refreshes. Furthermore, the architecture leverages serverless backend functions to decouple raw schedule data from the client, parsing external JSON files to feed the frontend interactive rosters and game timelines dynamically.</p>
          <div className='slide-footer'>
            <p> <strong>SCROLL NEXT FOR DEMO VIDEO</strong></p>
          </div>
        </div>
      ),
    },
    { 
      id: 'slide-3',  
      content: (
        <div className="slide-inner-content">
          <video autoPlay loop muted playsInline className="background-video">
            <source src={landing} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ),
    },
    { 
      id: 'slide-4',
      content: (
        <div className="slide-inner-content">
          <h1>Schedule</h1> 
          <p>This dynamic schedule engine bridges a state-driven React frontend with a Netlify serverless backend to deliver an interactive, data-decoupled match tracker. Instead of bundling heavy static data into the client build, a Netlify background function intercepts user dropdown selections, reads the requested timeline parameter, and serves targeted JSON payloads dynamically. On the frontend, a reactive pipeline handles data hydration, while a high-performance linear reduction pass calculates total games played, records, and win percentages on the fly. The user experience is rounded out by an athletic, context-aware design—including dynamic row highlights for wins and losses, localized home/away indicators, mobile-friendly overflow boundaries, and scroll-tracked parallax background effects that activate seamlessly as users explore the team's history.
            A similar architecture is used for the roster as well.
          </p>
           <div className='slide-footer'>
            <p> <strong>SCROLL NEXT FOR DEMO VIDEO</strong></p>
          </div>
        </div>
      ),
    },
    { 
      id: 'slide-5',  
      content: (
        <div className="slide-inner-content">
          <video autoPlay loop muted playsInline className="background-video">
            <source src={schedule} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ),
    },
    { 
      id: 'slide-6',
      content: (
        <div className="slide-inner-content">
          <h1>Carousel</h1> 
          <p>This feature implements an immersive, interactive 3D photo carousel engineered with React Three Fiber and WebGL to showcase player highlights in a visually gripping format that breaks away from traditional flat image sliders. To capture the raw energy and momentum of the players in action, the design choice treats the media gallery like a cinematic stadium display: individual player textures are distributed across a calculated radial cylinder using trigonometric polar coordinates, while a frame-rate independent physics loop drives a continuous, smooth rotation. This spatial layout is enhanced by custom 3D lighting architecture—combining a centered, high-intensity beam with an optimized material texture—so that each action shot subtly glows and cuts through the dark environment like a dramatic camera flash, creating a high-octane spotlight effect.
          </p>
           <div className='slide-footer'>
            <p> <strong>SCROLL NEXT FOR DEMO IMAGE</strong></p>
          </div>
        </div>
      ),
    },
    { 
      id: 'slide-7',  
      content: (
        <div className="slide-inner-content">
          <img src = {carousel} alt = '' />
        </div>
      ),
    },
    {
      id: 'slide-8',
      content: (
        <div className="slide-inner-content">
          <div className='mobile-content'>
            <div className='mobile-mov'>
              <video autoPlay loop muted playsInline className="background-video">
                <source src={mobile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className='mobile-text'>
              <h1>Mobile UI/UX</h1>
              <p>Recognizing that the vast majority of our user traffic originated from mobile devices, prioritizing a flawless responsive UX became a core focus of our design and development cycle. I engineered a highly adaptive interface that leverages fluid CSS layouts, media queries, and dynamic resizing to guarantee the structural view plane remains intact across varying screen sizes. To prevent complex spatial content—such as multi-column splits—from breaking, I implemented precision flexbox scaling, assigning dedicated percentage boundaries to preserve visual hierarchy. Furthermore, I overhauled the global navigation wrapper with responsive breakpoint listeners, cleanly compressing standard desktop navigational items into an interactive, animated hamburger menu on smaller screens to maximize layout real estate and retain intuitive usability.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const [visibleDeck, setVisibleDeck] = useState([
    { keyId: 0, slideIndex: 0},
    { keyId: 1, slideIndex: 1},
    { keyId: 2, slideIndex: 2},
    { keyId: 3, slideIndex: 3},
    { keyId: 4, slideIndex: 4},
    { keyId: 5, slideIndex: 5},
    { keyId: 6, slideIndex: 6},
    { keyId: 7, slideIndex: 7},
    { keyId: 8, slideIndex: 8},
  ]);

  const containerRef = useRef(null);
  const keyCounter = useRef(9);
  const actionRef = useRef(null); // track scroll up or down

  const isSliderAnimating = useRef(false);
  const wheelAccumulator = useRef(0);
  const isWheelActive = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isTouchActive = useRef(false);

  const wheelThreshold = 100;
  const touchThreshold = 50;
  
  // First handle and load stack placement
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.Slides');
    cards.forEach((card, i) => {
      gsap.set(card, {
        y: (-4 * i) + "%", // Fixed: Corrected structural typo multiplier to step dynamically
        z: -80 * i,
        opacity: 1,
      });
    });
  }, []);

  // Run the GSAP 3D Shifting Timelines based on State Mutations
  useLayoutEffect(() => {
    if (!actionRef.current) return;

    const cards = containerRef.current.querySelectorAll('.Slides');
    const { type } = actionRef.current;

    if (type === 'down') {
      const newCard = cards[cards.length - 1];
      if (newCard) {
        gsap.set(newCard, { y: "-16%", z: -320, opacity: 0 }); 
      }

      cards.forEach((card, i) => {
        let targetPosition = i - 1;
        gsap.to(card, {
          y: targetPosition < 0 ? "-100%" : (-4 * targetPosition) + "%",
          z: targetPosition < 0 ? 100 : -80 * targetPosition,
          opacity: targetPosition < 0 ? 0 : 1,
          duration: 1,
          ease: 'power3.inOut',
          onComplete: () => {
            if (i === 0) {
              actionRef.current = null;
              setVisibleDeck((prev) => prev.slice(1));
              isSliderAnimating.current = false;
            }
          },
        });
      });
    }

    if (type === 'up') {
      const newCard = cards[0];
      if (newCard) {
        gsap.set(newCard, { y: "100%", z: 100, opacity: 0 }); 
      }

      cards.forEach((card, i) => {
        let targetPosition = i;
        gsap.to(card, {
          y: (-4 * targetPosition) + "%",
          z: -80 * targetPosition,
          opacity: targetPosition > 3 ? 0 : 1,
          duration: 1,
          ease: 'power3.inOut',
          onComplete: () => {
            if (i === cards.length - 1) {
              actionRef.current = null;
              setVisibleDeck((prev) => prev.slice(0, -1));
              isSliderAnimating.current = false;
            }
          },
        });
      });
    }
  }, [visibleDeck]);

  const handleSlideChange = (direction) => {
    if (isSliderAnimating.current) return;
    isSliderAnimating.current = true;

    if (direction === 'down') {
      const nextSlideIndex = (visibleDeck[visibleDeck.length - 1].slideIndex + 1) % slideData.length;
      const newKeyId = keyCounter.current++;
      actionRef.current = { type: 'down' };
      setVisibleDeck((prev) => [...prev, { keyId: newKeyId, slideIndex: nextSlideIndex }]);
    } else {
      const prevSlideIndex = (visibleDeck[0].slideIndex - 1 + slideData.length) % slideData.length;
      const newKeyId = keyCounter.current++;
      actionRef.current = { type: 'up' };
      setVisibleDeck((prev) => [{ keyId: newKeyId, slideIndex: prevSlideIndex }, ...prev]);
    }
  };

  // Event Listeners for Touch and Mousewheel Tracking
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isSliderAnimating.current || isWheelActive.current) return;

      wheelAccumulator.current += Math.abs(e.deltaY);

      if (wheelAccumulator.current >= wheelThreshold) {
        isWheelActive.current = true;
        wheelAccumulator.current = 0;
        const direction = e.deltaY > 0 ? 'down' : 'up';
        handleSlideChange(direction);

        setTimeout(() => {
          isWheelActive.current = false;
        }, 1200);
      }
    };

    const handleTouchStart = (e) => {
      if (isSliderAnimating.current || isTouchActive.current) return;
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (isSliderAnimating.current || isTouchActive.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = Math.abs(touchStartX.current - touchEndX);

      if (Math.abs(deltaY) > deltaX && Math.abs(deltaY) > touchThreshold) {
        isTouchActive.current = true;
        const direction = deltaY > 0 ? 'down' : 'up';
        handleSlideChange(direction);

        setTimeout(() => {
          isTouchActive.current = false;
        }, 1200);
      }
    };

    const wrapper = containerRef.current;
    if (!wrapper) return;

    wrapper.addEventListener('wheel', handleWheel, { passive: false });
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener('wheel', handleWheel);
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchend', handleTouchEnd);
    };
  }, [visibleDeck]);

  return (
    <div className="club-hockey-body" ref={containerRef}>
        <nav className='nav-container'>
          <div className="nav-item">
            <Link to="/projects">
              BACK
            </Link>
          </div>
  
          <div className="story-tracker">
            {slideData.map((_, index) => {
              const activeIndex = visibleDeck[0]?.slideIndex ?? 0;
              
              let barClass = "tracker-bar";
              if (index < activeIndex) barClass += " completed";
              if (index === activeIndex) barClass += " active";
  
              return <div key={index} className={barClass} />;
            })}
          </div>
  
          <div className="nav-item">
            <a href="https://colbyclubhockey.com/" target="_blank" rel="noopener noreferrer">LIVE SITE</a>
          </div>
        </nav>

        <div className="slider-track">
          {visibleDeck.map((item) => {
            const slide = slideData[item.slideIndex];
            if (!slide) return null;
            return (
              <div className="Slides" id={slide.id} key={item.keyId}>
                {slide.content}
              </div>
            );
          })}
        </div>

       <div className='page-footer'>
          <p>ALEX DUAN 2026</p>
          <p>COLBY CLUB HOCKEY WEBSITE</p>
        </div>
      
        <FluidCanvas className="gradient-canvas"/>
    </div>
  );
}

export default transition(ClubHockey);