import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import landing from '../dragons_website/homepage_demo.mp4';
import register from '../dragons_website/register_demo.png'
import schedule from '../dragons_website/schedule_demo.mp4'
import FluidCanvas from '../components/FluidCanvasBW';
import '../styles/Dragons.css';
import { Link } from 'react-router-dom';
import identity from '../dragons_website/dragons_identity.png'
import jersey from '../dragons_website/dragons_jersey.png'
import inGame from '../dragons_website/jersey_in_game.jpg'
import flowchart from '../dragons_website/flowchart.png'
import transition from '../transitionGallery'

gsap.registerPlugin(SplitText);

function Dragons() {
  // Define your custom slide structures inside an array
  const slideData = [
    { 
      id: 'slide-0', 
      content: (
        <div className="slide-inner-content">
          <h1 className="animate-text">Overview</h1> 
          <p><strong>STACK:  </strong>React | JavaScript | HTML5/CSS3 | Netlify | Git | PayPal SDK | Google Sheets API</p>
          <p>This is a full-stack web application for the East Coast Dragons. 
            It utlizies modern React patterns and CSS styles for a sleek on-brand front end that matches the brand's identity
            It also implments a registration form that integrates PayPal SDK for the payment pipeline 
            and a Google Sheets API back end to store user data.
          </p>

        </div>
      ),
    },
    { 
      id: 'slide-1', 
      content: (
        <div className="slide-inner-content">
          <h1 className="animate-text">BRAND IDENTITY</h1> 
          <img src = {identity} alt = '' />
          <p>The Dragons brand identity balances grassroots athletic grit with a mission-driven call for inclusivity, representation, and community. 
            The brand utilizes a high-contrast, bold color palette consisting of crisp white, a deep crimson red, and a sharp black. 
            This aggressive color scheme is paired with a retro script logotype featuring a sweeping tail underscore, which mimics the nostalgic aesthetic of classic athletic franchises while remaining unmistakably bold.
          </p>
          <p>
            This defiant visual language perfectly reinforces the brand's core purpose: a movement born in 2023 to reject conformity and build a completely unique lane in summer hockey. 
            Rather than defining itself by standard athletic metrics like wins and losses, the Dragons identity is deeply rooted in family and culture. 
            It positions itself not just as a rotating roster of tournament players, but as an ever-expanding, lifelong collective governed by a singular, unyielding ethos: <strong>"Once a Dragon, always a Dragon." </strong> 
          </p>
        </div>
      )
    },
    {
      id: 'slide-2',
      content: (
        <div className="slide-inner-content">
          <h1 className="animate-text">Inspiration</h1>
          <div className='inspiration-block'>
            <img className = "img-side" src = {jersey} alt = '' />
            <div className='text-side'>
            <img src = {inGame} alt = '' />
            <p>
                I designed a black color way jersey. 
                It features the red and white Dragons logo with bold font and simple white and red stripes.
                I wanted to build upon this dark color way for the brand and implement it in our website. 
            </p>
            </div>

          </div>
        </div>
      ),
    },
    {
      id: 'slide-3',
      content: (
        <div className="slide-inner-content">
          <h1 className="animate-text">Landing Page</h1>
          <p className="animate-text"> The landing page features a dynamic looping video background. The video is an edit made by Alger Productions of our players in action during a tournament. Overlaying the video is our red white Dragons logo. Since the main purpose of this website is to register for a tournament, I included a register button that links to the register page on the navbar and on the landing page.
          </p>
          <div className='slide-footer'>
          <p className="animate-text"> <strong>SCROLL NEXT FOR DEMO VIDEO</strong></p>
          </div>
        </div>
      ),
    },
    { 
      id: 'slide-4',  
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
      id: 'slide-5',
      content: (
        <div className="slide-inner-content">
          <h1 className="animate-text">Register</h1>
          <p>This tournament registration system connects a custom React frontend with a secure serverless backend to create a smooth, automated user experience. Players move through a multi-step registration wizard that saves progress locally, securely handles PayPal payments, and instantly triggers a backend workflow that saves the info on a Google Sheet and sends a confirmation email. Serverless functions act as a protected API layer, keeping Google Sheets endpoints, transaction logic, and automation details hidden from the client. The system dynamically manages pricing, logs registrations, and sends confirmation emails automatically, all without manual maintenance or separate server hosting costs.
          </p>
          <img src = {flowchart} alt = ''/>
          <div className='slide-footer'>
            <p className="animate-text"> <strong>SCROLL NEXT FOR DEMO IMAGE</strong></p>
          </div>
        </div>
      ),
    },
    { 
      id: 'slide-6',  
      content: (
        <div className="slide-inner-content">
          <img src = {register} alt = '' />
        </div>
      ),
    },
    {
      id: 'slide-7',
      content: (
        <div className="slide-inner-content">
          <h1 className="animate-text">Schedule</h1>
          <p className="animate-text"> This schedule system connects a React frontend with Netlify serverless functions to dynamically display tournament schedules and lineup information. The React component uses state to track the selected age group, defaulting to U18, and automatically fetches the correct schedule whenever the dropdown changes between the age groups. A separate backend request loads the full summer tournament lineup once when the page first opens. Instead of storing all schedule logic directly in the frontend, the app calls a Netlify function, which reads the selected group from the request URL and returns the correct JSON file for that team. The frontend then maps over the returned data and renders it into clean table rows for game dates, times, rinks, opponents, tournament names, and states. This creates a simple, maintainable schedule page where team-specific data can be updated through JSON files while the user gets an interactive dropdown-based experience.
            
          </p>
          <div className='slide-footer'>
          <p className="animate-text"> <strong>SCROLL NEXT FOR DEMO VIDEO</strong></p>
          </div>
        </div>
      ),
    },
    { 
      id: 'slide-8',  
      content: (
        <div className="slide-inner-content">
          <video autoPlay loop muted playsInline className="background-video">
            <source src={schedule} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ),
    },
  ];

  // React tracks unique object cards to animate rendering states
  const [visibleDeck, setVisibleDeck] = useState([
    { keyId: 0, slideIndex: 0 },
    { keyId: 1, slideIndex: 1 },
    { keyId: 2, slideIndex: 2 },
    { keyId: 3, slideIndex: 3 },
    { keyId: 4, slideIndex: 4 },
    { keyId: 5, slideIndex: 5 },
    { keyId: 6, slideIndex: 6 },
    { keyId: 7, slideIndex: 7 },
    { keyId: 8, slideIndex: 8 },
  ]);

  const containerRef = useRef(null);
  const keyCounter = useRef(9);
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
    <div className="dragons-body" ref={containerRef}>
      <nav className='nav-container'>
        <div className="nav-item">
          <Link to="/work">
            BACK
          </Link>
        </div>

        <div className="story-tracker">
          {slideData.map((_, index) => {
            // Evaluates active card index position relative to the deck view array slice
            const activeIndex = visibleDeck[0]?.slideIndex ?? 0;
            
            let barClass = "tracker-bar";
            if (index < activeIndex) barClass += " completed";
            if (index === activeIndex) barClass += " active";

            return <div key={index} className={barClass} />;
          })}
        </div>

        <div className="nav-item">
          <a href="https://eastcoastdragons.com/home" target="_blank" rel="noopener noreferrer">LIVE SITE</a>
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

      <div className='page-footer'>
        <p>ALEX DUAN 2026</p>
        <p>EAST COAST DRAGONS WEBSITE</p>
      </div>

      <FluidCanvas className="gradient-canvas" />
    </div>



  );
}

export default transition(Dragons);