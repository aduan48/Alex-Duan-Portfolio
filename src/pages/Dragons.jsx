import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import landing from '../dragons_website/homepage_demo.mp4';
import FluidCanvas from '../components/FluidCanvasBW';
import '../styles/Dragons.css';
import { Link } from 'react-router-dom';

gsap.registerPlugin(SplitText);

function Dragons() {
  // Define your custom slide structures inside an array
  const slideData = [
    { id: 'slide-0', content: <h1>Overview</h1> },
    {
      id: 'slide-1',
      content: (
        <h1>Landing Page</h1>
      ),
    },
    { id: 'slide-2',  content: (
        <video autoPlay loop muted playsInline className="background-video">
          <source src={landing} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ),},
    { id: 'slide-3', content: <h1>BRAND IDENTITY</h1> },
  ];

  // React tracks unique object cards to animate rendering states
  const [visibleDeck, setVisibleDeck] = useState([
    { keyId: 0, slideIndex: 0 },
    { keyId: 1, slideIndex: 1 },
    { keyId: 2, slideIndex: 2 },
    { keyId: 3, slideIndex: 3 },
  ]);

  const containerRef = useRef(null);
  const keyCounter = useRef(4);
  const actionRef = useRef(null); // Tracks layout scroll 'up' or 'down'

  // Ref locks to decouple high frequency events from re-renders
  const isSliderAnimating = useRef(false);
  const wheelAccumulator = useRef(0);
  const isWheelActive = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isTouchActive = useRef(false);

  const wheelThreshold = 100;
  const touchThreshold = 50;

  // Handle Initial Stack Placement on first load
        useEffect(() => {
        const cards = containerRef.current.querySelectorAll('.Slides');
        cards.forEach((card, i) => {
            gsap.set(card, {
            y: (-4 * i) + "%",  // Tightened gap from 15% to 4% (0%, -4%, -8%, etc.)
            z: -80 * i,         // Pushes cards BACK in 3D space instead of forward
            opacity: 1,
            });
            const title = card.querySelector('h1');
            if (title) {
            new SplitText(title, { type: 'words', mask: 'words' });
            }
        });
        }, []);

  // Run the GSAP 3D Shifting Timelines based on State Mutations
  useLayoutEffect(() => {
    if (!actionRef.current) return;

    const cards = containerRef.current.querySelectorAll('.Slides');
    const { type } = actionRef.current;

    if (type === 'down') {
  const newCard = cards[cards.length - 1];
  // Set incoming card to sit at the very back of the tighter stack
  gsap.set(newCard, { y: "-16%", z: -320, opacity: 0 }); 

  const title = newCard.querySelector('h1');
  let split;
  if (title) {
    split = new SplitText(title, { type: 'words', mask: 'words' });
    gsap.set(split.words, { yPercent: 100 });
  }

  cards.forEach((card, i) => {
    let targetPosition = i - 1;
    gsap.to(card, {
      // Pushes the exited card cleanly UP and away off-screen, shifts others forward
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

  if (split) {
    gsap.to(split.words, {
      yPercent: 0,
      duration: 0.75,
      ease: 'power4.out',
      stagger: 0.15,
      delay: 0.5,
    });
  }
}

// 3. UPDATE THE SCROLL UP ANIMATION (inside useLayoutEffect -> type === 'up')
if (type === 'up') {
  const newCard = cards[0];
  // Incoming card drops down from the front
  gsap.set(newCard, { y: "100%", z: 100, opacity: 0 }); 

  const title = newCard.querySelector('h1');
  if (title) {
    new SplitText(title, { type: 'words', mask: 'words' });
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
    <div className="dragons-body" ref={containerRef}>
        <nav className='nav-container'>
            <div className="nav-item back-btn">
                <Link to="/work">
                    <p>BACK</p>
                </Link>
            </div>

            <div className="nav-item name-brand">
                <p>ALEX DUAN</p>
            </div>
        </nav>
      <div className="slider-track">
        {visibleDeck.map((item) => {
          const slide = slideData[item.slideIndex];
          return (
            <div className="Slides" id={slide.id} key={item.keyId}>
              {slide.content}
            </div>
          );
        })}
      </div>
      <FluidCanvas className="gradient-canvas" />
    </div>
  );
}

export default Dragons;