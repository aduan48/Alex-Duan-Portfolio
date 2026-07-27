import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import FluidCanvas from '../components/FluidCanvas';
import transition from '../transitionGallery';
import '../styles/Home.css';

function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Animate in from offset position
    gsap.fromTo(
      heroRef.current,
      { y: '30px', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
      }
    );

    // Animate out when navigating away
    return () => {
      gsap.to(heroRef.current, {
        y: '-50%',
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in'
      });
    };
  }, []);

  return (
    <div className='Home'>
      

      {/* HERO SECTION */}
      <div className='hero' ref={heroRef}>
        <FluidCanvas className='gradient-canvas' />

        <div className='hero-content'>
          <span className='hero-tagline'>BRANDING WEBSITE DESIGN & DEVELOPMENT FOR YOUR SPORT ORG</span>
          <h1>Custom Web Platforms for Teams, Clubs & Tournaments</h1>
          <p className='hero-subtext'>
            I help youth sports leagues, club teams, and athletic organizations replace clunky portals with modern, mobile-friendly websites that streamline registration and build trust.
          </p>

          <div className='hero-actions'>
            <a href='#featured-work' className='btn-primary'>View Featured Projects</a>
            <Link to='/about' state={{ scrollToContact: true }} className='btn-secondary'>
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURED WORK SHOWCASE */}
      <div className='non-hero'>
      <section id='featured-work' className='featured-section'>
        <h2>FEATURED SPORTS PROJECTS</h2>
        <p className='section-subtitle'>Custom digital presences engineered for growth and ease of use.</p>

        <div className='project-grid'>
          {/* Card 1: East Coast Dragons */}
          <div className='project-card'>
            <div className='project-tag'>Tournament & Business Platform</div>
            <h3>East Coast Dragons</h3>
            <p>Full-stack web app and brand identity built for a hockey tournament business. Streamlined registration pipelines to scale community to 200+ athletes.</p>
            <div className='project-tech'>
              <span>React</span>
              <span>Registration Pipeline</span>
              <span>Brand Strategy</span>
            </div>
          </div>

          {/* Card 2: Colby Men's Soccer */}
          <div className='project-card'>
            <div className='project-tag'>Digital Brand</div>
            <h3>Colby Men's Soccer</h3>
            <p>Architected a high-energy digital brand presence and interactive frontend to engage fans, recruit athletes, and keep parents updated.</p>
            <div className='project-tech'>
              <span>UI/UX Design</span>
              <span>Frontend Development</span>
              <span>Media Strategy</span>
            </div>
          </div>

          {/* Card 3: Colby Club Hockey */}
          <div className='project-card'>
            <div className='project-tag'>Club Operations</div>
            <h3>Colby Club Hockey</h3>
            <p>Modernized the program’s web presence with clean layout architecture, simplifying schedule tracking and roster management.</p>
            <div className='project-tech'>
              <span>React</span>
              <span>Responsive Design</span>
              <span>Branding</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROP BANNER */}
      <div className='end-block'>
        <section className='value-banner'>
          <h2>Ready to Upgrade Your Club's Website?</h2>
          <p>Whether you need a full custom build, seamless registration flows, or a refreshed visual brand, let's talk about your team.</p>
          <Link to='/about' state={{ scrollToContact: true }} className='btn-primary'>
            Start a Conversation
          </Link>
        </section>
      </div>
    </div>
    </div>
  );
}

export default transition(Home);