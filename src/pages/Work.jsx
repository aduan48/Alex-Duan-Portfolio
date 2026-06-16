import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Work.css'
import FluidCanvas from '../components/FluidCanvas';
import transition from '../transitionGallery';

function Work() {
  const [activeProject, setActiveProject] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const projectRefs = useRef([]);



  // Projects list matching your DOM elements for label matching
  const projectsList = [
    { title: "EAST COAST DRAGONS" },
    { title: "COLBY CLUB HOCKEY" },
    { title: "EPHEMERAL" },
    { title: "COLBY SOCCER" }
  ];

  // 1. DEDICATED SCROLL PROGRESS HOOK (Never reboots, stays buttery smooth)
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // passive helps scroll performance
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // EMPTY dependency array so it binds exactly ONCE

  // 2. DEDICATED INTERSECTION OBSERVER HOOK
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = projectRefs.current.indexOf(entry.target);
        if (index === -1) return;

        if (entry.isIntersecting) {
          setActiveProject(index);
        }
        else if (!entry.isIntersecting && entry.boundingClientRect.top > 0){
          if (index > 0 && activeProject === index) {
            setActiveProject(index - 1);
          }
        }
      });
    }, observerOptions);

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeProject]); // This one can safely reboot without touching the scroll listener

  // Quick utility to scroll click directly to a project block smoothly
  const scrollToBlock = (index) => {
    projectRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className='Work'>
      <FluidCanvas className="gradient-canvas"/>
      
      {/* MINIMALIST SIDEBAR MINIMAP */}
      <div className="work-minimap">
        <div className="minimap-track-wrapper">
          <div 
            className="minimap-progress-bar" 
            style={{ 
              height: `${(activeProject / (projectsList.length - 1)) * 100}%` 
            }}
          ></div>
        </div>
        <div className="minimap-labels">
          {projectsList.map((project, idx) => (
            <div 
              key={idx} 
              className={`minimap-node ${activeProject === idx ? 'active' : ''}`}
              onClick={() => scrollToBlock(idx)}
            >
              <span className="node-number">0{idx + 1}</span>
              <span className="node-title">{project.title}</span>
            </div>
          ))}
        </div>
      </div>

      <h1>PROJECTS</h1>

      
        {/* PROJECT BLOCK 3 */}
        <div className='project-block' ref={el => projectRefs.current[0] = el}>
          <div className='project-header'>
            <div className='project-title'>
              <h2>EAST COAST DRAGONS</h2>
            </div>
            <div className='work-links'>
              <Link to="/projects/dragons"> VIEW </Link>
              <a href="https://eastcoastdragons.com/" target="_blank" rel="noopener noreferrer">SITE</a>
              <a href="https://github.com/aduan48/East-Coast-Dragons" target="_blank" rel="noopener noreferrer">GITHUB</a>
            </div>
          </div>
          <div className='content'>
            <p>A sleek full-stack web experience built for the East Coast Dragons, blending sharp visual identity with functional infrastructure. The site uses modern React patterns and refined CSS styling to create an on-brand digital presence that feels fast, polished, and athletic. Beyond the frontend, it integrates a secure registration system with PayPal payments and a Google Sheets backend, turning the website into both a promotional platform and a streamlined operational tool for managing player data, payments, and tournament signups.</p>
         </div>
        </div>

         {/* PROJECT BLOCK 4 */}
         <div className='project-block' ref={el => projectRefs.current[1] = el}>
          <div className='project-header'>
            <div className='project-title'>
              <h2>COLBY CLUB HOCKEY</h2>
            </div>
            <div className='work-links'>
              <Link to="/projects/club-hockey"> VIEW </Link>
              <a href="https://colbyclubhockey.com/" target="_blank" rel="noopener noreferrer">SITE</a>
              <a href="https://github.com/aduan48/Colby-Club-Hockey-V2026" target="_blank" rel="noopener noreferrer">GITHUB</a>
            </div>
          </div>
          <div className='content'>
            <p>A polished full-stack web experience built for Colby Club Hockey, combining modern React architecture with adaptive styling, interactive 3D elements, and a clean athletic identity. The site creates a responsive digital presence that feels fast, dynamic, and on-brand, while giving users easy access to team information, schedules, rosters, and livestream links. Beyond the frontend, the platform uses Netlify Forms for serverless submission tracking, local storage to protect user inputs from accidental refreshes, and backend functions that separate raw schedule data from the client. By parsing external JSON files into interactive rosters and game timelines, the website becomes both a promotional home for the club and a functional tool for managing updates, player information, and team operations.

            </p>
         </div>
        </div>

      <div>
        {/* PROJECT BLOCK 1 */}
        <div className='project-block' ref={el => projectRefs.current[2] = el}>
          <div className='project-header'>
            <div className='project-title'>
              <h2>EPHEMERAL</h2>
            </div>
            <div className='work-links'>
              <Link to="/projects/ephemeral"> VIEW </Link>
              <a href="https://www.instagram.com/ephemeral.nova/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            </div>
          </div>
          <div className='content'>
            <p>A visual exploration of distortion, memory, and digital impermanence that moves beyond minimalism into sensory-driven design. Centered around intimate, striking portraiture, the collection establishes an immediate psychological connection with the viewer. This moody, cinematic tension is brought to life through a high-contrast, late-night palette of deep blacks, glowing neons, and burning ambers that pulse with kinetic energy.</p>
          </div>
        </div>

        {/* PROJECT BLOCK 2 */}
        <div className='project-block' ref={el => projectRefs.current[3] = el}>
          <div className='project-header'>
            <div className='project-title'>
              <h2>COLBY SOCCER</h2>
            </div>
            <div className='work-links'>
              <Link to="/projects/colby"> VIEW </Link>
              <a href="https://www.instagram.com/colbymsoccer/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            </div>
          </div>
          <div className='content'>
            <p>A dynamic visual exploration of collegiate athletic identity and momentum that shifts sports promotion into narrative-driven design. Utilizing sharp diagonal layouts, vertical typography, and split-frame compositions, the collection captures the high-stakes kinetic energy of the game without relying on repetitive templates. The work leverages a fierce, cinematic palette of institutional Colby Blue, crisp whites, and atmospheric textures to anchor the audience directly into the team's athletic universe.</p>
          </div>
        </div>


      </div>
    </div>
  )
}

export default transition(Work)