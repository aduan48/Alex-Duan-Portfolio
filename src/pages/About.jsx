import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Footer from '../components/Footer';
import FluidCanvas from '../components/FluidCanvas';
import { useLocation } from 'react-router-dom'; // FIX: Imported useLocation hook
import transition from '../transitionGallery'
import '../styles/About.css';

function About() {

  return (
    <>
    <div className='About'>
         <FluidCanvas className = "gradient-canvas"/>

         <div className='about-content'>
            <div className='about-text'>
                <h1>ABOUT ME</h1> 
               <div className='info'>
                  <p>
                    I’m Alex Duan, a Math and Computer Science student at Colby College specializing in custom web development and visual design. I bridge the gap between technical infrastructure and high-impact design so businesses can present a professional face to their clients.
                  </p> 
                  <p>
                    My work in branding and web development began with co-founding the <strong>East Coast Dragons</strong>, a hockey tournament business. I built our web applications and streamlined registration pipelines from scratch while crafting the visual marketing that scaled our community to over 200+ athletes. I learned firsthand what team directors actually need: tools that save administrative time and a web presence that inspires trust.
                  </p>  
                  <p>
                    Since then, I’ve partnered with programs like <strong>Colby Men’s Soccer</strong> and <strong>Colby Club Hockey</strong> to elevate their digital identities. From custom interactive interfaces to crisp mobile layouts, I treat brand design and web engineering as two sides of the same coin.
                  </p>  
                  <p>
                    Whatever your business is, I build fast, tailored websites that simplify operations and make your organization stand out.
                  </p>      
                </div>   
            </div>
          <div className='contact-content'>
            <h1>CONTACT INFO</h1> 
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
    <Footer />
    </>
  )
}

export default transition(About)
