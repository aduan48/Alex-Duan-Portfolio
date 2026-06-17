import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FluidCanvas from '../components/FluidCanvas';
import { useLocation } from 'react-router-dom'; // FIX: Imported useLocation hook
import transition from '../transitionGallery'
import '../styles/About.css';

function About() {
  const location = useLocation(); // FIX: Initialized location variable so your useEffect can see it

  useEffect(() => {
    if (location.state?.scrollToContact) {
      const timer = setTimeout(() => {
        const contactSection = document.getElementById('contact-section');
        contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Clean up window history state payload
        window.history.replaceState({}, document.title);
      }, 150); // Bumped up slightly to guarantee canvas mounting layout calculations complete

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className='About'>
         <FluidCanvas className = "gradient-canvas"/>

         <div className='about-content'>
            <div className='about-text'>
                <h1>ABOUT ME</h1> 
                <div className='info'>
                  <p>
                    I am a builder who explores the intersection of logic, design, and human connection. Currently pursuing Math and Computer Science at Colby College, my goal is to figure out how software and design can unite to solve real-world problems for real people.

                  </p> 
                  <p>
                    My path toward product management started with the East Coast Dragons. Navigating the realm of starting a hockey tournament business from the ground up, I had to build both the program’s technical infrastructure and its brand identity from scratch. I engineered our full-stack web applications and streamlined our user registration pipelines while simultaneously crafting the visual assets and cross-channel marketing strategies that scaled our community to over 200+ athletes. That experience taught me what it truly means to own a product lifecycle: balancing strict technical constraints with a cohesive, engaging user experience.

                  </p>  
                  <p>
                    Since then, I’ve expanded on this duality by working with Colby Men’s Soccer and Colby Club Hockey to architect their digital brand presences. Whether I am writing clean React code to build interactive interfaces or designing cinematic visual identities that elevate a team's community presence, I treat brand identity and code as two sides of the same coin. To me, a product's frontend architecture and its visual storytelling must work in perfect harmony to build trust and engagement.

                  </p>  
                  <p>
                    Ultimately, my goal isn't just to build standalone products, but to build communities. I want to produce digital spaces where people feel seen, connected, and empowered. In my career, I hope to use my design and engineering skills to create technology that brings people together.

                  </p>      
                </div>       
            </div>
          <div className='contact-content' id='contact-section'>
            <h1>CONTACT ME</h1> 
            <div className='info contact-grid'>
              
              {/* EMAIL ITEM */}
              <div className='contact-item'>
                <span className='contact-label'>EMAIL</span>
                <a href="mailto:ajduan29@colby.edu" className='contact-link'>
                  ajduan29@colby.edu
                </a>
              </div>

              {/* PHONE ITEM */}
              <div className='contact-item'>
                <span className='contact-label'>PHONE</span>
                <a href="tel:+17745035101" className='contact-link'>
                  +1 (774) 503-5101
                </a>
              </div>

            </div> {/* <-- Added: Closes .contact-grid */}
          </div> {/* <-- Added: Closes .contact-content */}
        </div> {/* <-- Added: Closes .about-content */}
      
    </div>
  )
}

export default transition(About)
