import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'; // Fixed: Included missing react hook imports
import gsap from 'gsap';
import '../styles/ClubHockey.css';
import FluidCanvas from '../components/FluidCanvasBW';
import { Link } from 'react-router-dom';
import transition from '../transitionGallery';

function ClubHockey() {


  const slideData = [
    { 
      id: 'slide-0',
      content: (
        <div className="slide-inner-content">
          <h1>Overview</h1> 
          <p><strong>STACK:  </strong>React | JavaScript | HTML5/CSS3 | Netlify | Git | PayPal SDK | Google Sheets API</p>
          <p>This is a full-stack web application for the East Coast Dragons. 
            It utilizes modern React patterns and CSS styles for a sleek on-brand front end that matches the brand's identity.
            It also implements a registration form that integrates PayPal SDK for the payment pipeline 
            and a Google Sheets API back end to store user data.
          </p>
        </div>
      ),
    },
    { 
      id: 'slide-1', 
      content: (
        <div className="slide-inner-content">
          <h1>Overview</h1> 
          <p><strong>STACK:  </strong>React | JavaScript | HTML5/CSS3 | Netlify | Git | PayPal SDK | Google Sheets API</p>
          <p>This is a full-stack web application for the East Coast Dragons. 
            It utilizes modern React patterns and CSS styles for a sleek on-brand front end that matches the brand's identity.
            It also implements a registration form that integrates PayPal SDK for the payment pipeline 
            and a Google Sheets API back end to store user data.
          </p>
        </div>
      ),
    },
  ];

  const [visibleDeck, setVisibleDeck] = useState([
    { keyId: 0, slideIndex: 0},
    { keyId: 1, slideIndex: 1},
  ]);

  const containerRef = useRef(null);
  const keyCounter = useRef(2);
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
            <Link to="/work">
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