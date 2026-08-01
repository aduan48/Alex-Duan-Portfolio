import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import FluidCanvas from '../components/FluidCanvas';
import transition from '../transitionGallery';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import dragonsHomepageDemo from '../dragons_website/homepage_demo.mp4';
import clubHockeyHomepageDemo from '../colby_website/homepage_demo.mp4'
import soccerPreview from '../colby_portfolio/soccer_preview.mp4'
import '../styles/Home.css';
import Carousel from '../components/Carousel'

const projects = [
  {
    slug: '/projects/dragons',
    tag: 'Integrated Platform',
    title: 'East Coast Dragons',
    desc: 'Full-stack web app and brand identity built for a hockey tournament business. Streamlined registration pipelines to scale community to 200+ athletes.',
    tech: ['React', 'Registration Pipeline', 'Brand Strategy'],
    video: dragonsHomepageDemo,
  },
  {
    slug: '/projects/colby',
    tag: 'Digital Brand',
    title: "Colby Men's Soccer",
    desc: 'Architected a high-energy digital brand presence and interactive frontend to engage fans, recruit athletes, and keep parents updated.',
    tech: ['UI/UX Design', 'Frontend Development', 'Media Strategy'],
    video: soccerPreview,
  },
  {
    slug: '/projects/club-hockey',
    tag: 'Club Operations',
    title: 'Colby Club Hockey',
    desc: "Modernized the program's web presence with clean layout architecture, simplifying schedule tracking and roster management.",
    tech: ['React', 'Responsive Design', 'Branding'],
    video: clubHockeyHomepageDemo,
  },
];

function Home() {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const contactRef = useRef(null);
  const previewRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const location = useLocation();


  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { y: '30px', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );
    return () => {
      gsap.to(heroRef.current, { y: '-50%', opacity: 0, duration: 0.8, ease: 'power4.in' });
    };
  }, []);

  // Set up smooth cursor-follow tweens once
  useEffect(() => {
    gsap.set(previewRef.current, { xPercent: 0, yPercent: -100 });
    xTo.current = gsap.quickTo(previewRef.current, 'x', { duration: 0.5, ease: 'power3' });
    yTo.current = gsap.quickTo(previewRef.current, 'y', { duration: 0.5, ease: 'power3' });
  }, []);

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

  const handleMouseMove = (e) => {
    xTo.current?.(e.clientX -3);
    yTo.current?.(e.clientY -3);
  };

  const handleMouseEnter = (video) => {
    setActiveVideo(video);
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(previewRef.current, { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power3.in' });
  };

  const scrollToFeatured = (e) => {
    e.preventDefault();
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className='Home'>
      <FluidCanvas className='gradient-canvas' />

      {/* HERO SECTION */}
      <div className='hero' ref={heroRef}>
        <div className='hero-content'>
          <h1>ALEX DUAN</h1>
          <span className='hero-tagline'>GRAPHIC DESIGN & WEBSITE DESIGN/DEVELOPMENT</span>
          <div className='hero-actions'>
            <a href='#featured-work' className='btn-primary' onClick={scrollToFeatured}>
              View Featured Projects
            </a>
            <a  href='#contact' onClick={scrollToContact} className='btn-secondary'>
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* FEATURED WORK SHOWCASE */}
      <div className='non-hero'>
        <section id='featured-work' className='featured-section' ref={featuredRef}>
          <h2 className='featured-work-title'>FEATURED PROJECTS</h2>

          <div className='project-grid'>
            {projects.map((p) => (
              <Link
                key={p.slug}
                to={p.slug}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onMouseEnter={() => handleMouseEnter(p.video)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className='project-card'>
                  <div className='project-tag'>{p.tag}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className='project-tech'>
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Carousel />

        {/* VALUE PROP BANNER */}
        <div className='contact-section' id = 'contact-section' ref={contactRef}>
          <Contact />
        </div>
      </div>

      {/* CURSOR-FOLLOW VIDEO PREVIEW */}
      <div className='card-preview'id ref={previewRef}>
        {activeVideo && (
          <video key={activeVideo} src={activeVideo} autoPlay muted loop playsInline />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default transition(Home);