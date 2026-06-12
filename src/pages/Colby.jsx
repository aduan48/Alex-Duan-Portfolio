import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import FluidCanvas from '../components/FluidCanvasBW';

import '../styles/Colby.css';
import { Link } from 'react-router-dom';
import transition from '../transitionGallery';

import slide1 from '../colby_portfolio/slide-1.webp';
import slide2 from '../colby_portfolio/slide-2.webp';
import slide3 from '../colby_portfolio/slide-3.webp';
import slide4 from '../colby_portfolio/slide-4.webp';
import slide5 from '../colby_portfolio/slide-5.webp';
import slide6 from '../colby_portfolio/slide-6.webp';
import slide7 from '../colby_portfolio/slide-7.webp';
import slide8 from '../colby_portfolio/slide-8.webp';
import slide9 from '../colby_portfolio/slide-9.webp';
import slide10 from '../colby_portfolio/slide-10.webp';
import slide11 from '../colby_portfolio/slide-11.webp';
import slide12 from '../colby_portfolio/slide-12.webp';

gsap.registerPlugin(Flip, CustomEase, ScrollToPlugin);

CustomEase.create(
  'hop',
  'M0,0 C0.028,0.528 0.129,0.74 0.27,0.852 0.415,0.967 0.499,1 1,1'
);

const slides = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
  slide10,
  slide11,
  slide12,
];

function Colby() {
  const navRef = useRef(null);
  const galleryRef = useRef(null);
  const imgPreviewsRef = useRef(null);
  const minimapRef = useRef(null);
  const layoutTextRef = useRef(null);
  const activeLayoutRef = useRef('layout-1-gallery');
  const lenisRef = useRef(null);


  const lightTheme = {
    color1: "#ffffff",
    color2: "#ffffff",
    color3: "#cccccc",
    color4: "#ffffff"
  };

  useEffect(() => {
    document.body.classList.add('colby-page');
    
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const nav = navRef.current;
    const items = nav.querySelectorAll('.nav-item p');
    const gallery = galleryRef.current;
    const imgPreviews = imgPreviewsRef.current;
    const minimap = minimapRef.current;
    const layoutText = layoutTextRef.current;

    // Initial resets
    gsap.set([imgPreviews, minimap], { autoAlpha: 0 });
    gsap.set(layoutText, { autoAlpha: 0, y: 20 });
    
    function enableLayout2Scroll() {
      document.body.classList.add('colby-can-scroll');

      requestAnimationFrame(() => {
        lenis.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
        lenis.start();
        handleScroll();
      });
    }

    function disableLayout2Scroll() {
      // 1. Instantly snap Lenis virtual wrapper back to 0
      lenis.scrollTo(0, { immediate: true });
      // 2. Stop Lenis operations
      lenis.stop();
      // 3. Fallback native scroll window reset
      window.scrollTo(0, 0);
      
      document.body.classList.remove('colby-can-scroll');
    }

    // Force initialization to start disabled (since initial layout is 1)
    disableLayout2Scroll();

  function handleScroll() {
    if (activeLayoutRef.current !== 'layout-2-gallery') return;

    const previewImages = imgPreviews.querySelectorAll('img');
    const galleryItems = gallery.querySelectorAll('.img');

    if (!previewImages.length || !galleryItems.length) return;

    // 1. Get current real-time Lenis scroll offset coordinates
    const scrollY = lenis.scroll || window.scrollY || 0;

    // 2. Calculate the exact scrollable path height of the center previews
    const totalPreviewHeight = imgPreviews.scrollHeight - window.innerHeight;
    if (totalPreviewHeight <= 0) return;

    // 3. Determine the 0 to 1 scroll progress decimal ratio
    const scrollProgress = Math.max(0, Math.min(scrollY / totalPreviewHeight, 1));

    // 4. Calculate the size of a single thumbnail block item (height + margin spacing)
    const singleThumbHeight = galleryItems[0].offsetHeight;
    const singleThumbMargin = parseFloat(window.getComputedStyle(galleryItems[0]).marginBottom || 0);
    const thumbStep = singleThumbHeight + singleThumbMargin;

    // 5. FIXED TRAVEL MATH: 
    // The gallery only needs to shift by the distance required to bring the last thumb to the top.
    // That distance is: (Total Items - 1) * the height step of one item.
    const totalGalleryTravel = (galleryItems.length - 1) * thumbStep;

    // 6. Project the progress ratio onto the thumbnail dimensions 
    const galleryTranslateY = -scrollProgress * totalGalleryTravel;

    // 7. Render layout transition smoothly
    gsap.to(gallery, {
      y: galleryTranslateY,
      ease: 'power2.out',
      duration: 0.2, 
    });
  }

    function switchLayout(newLayout) {
      if (newLayout === activeLayoutRef.current) return;

      // Smooth scroll up natively before committing if coming from Layout 2
      if (activeLayoutRef.current === 'layout-2-gallery' && (window.scrollY > 5 || lenis.scroll > 5)) {
        lenis.scrollTo(0, {
          duration: 0.5,
          onComplete: () => switchLayoutHandler(newLayout),
        });
      } else {
        switchLayoutHandler(newLayout);
      }
    }

    function switchLayoutHandler(newLayout) {
      const oldLayout = activeLayoutRef.current;
      const isLayout2 = newLayout === 'layout-2-gallery';

      const state = Flip.getState(gallery.querySelectorAll('.img'));

      gallery.classList.remove(oldLayout);
      gallery.classList.add(newLayout);

      let staggerValue = 0.025;
      if (
        (oldLayout === 'layout-1-gallery' && newLayout === 'layout-2-gallery') ||
        (oldLayout === 'layout-3-gallery' && newLayout === 'layout-2-gallery')
      ) {
        staggerValue = 0;
      }

      Flip.from(state, {
        duration: 1.5,
        ease: 'hop',
        stagger: staggerValue,
      });

      activeLayoutRef.current = newLayout;

      if (isLayout2) {
        enableLayout2Scroll();

        gsap.to([imgPreviews, minimap], {
          autoAlpha: 1,
          duration: 0.3,
          delay: 0.5,
        });
      } else {
        disableLayout2Scroll();

        gsap.to([imgPreviews, minimap], {
          autoAlpha: 0,
          duration: 0.3,
        });

        gsap.set(gallery, { clearProps: 'y' });
      }

      if (newLayout === 'layout-3-gallery') {
        gsap.to(layoutText, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          delay: 0.5,
          ease: 'power3.out',
        });
      } else {
        gsap.to(layoutText, {
          autoAlpha: 0,
          y: 20,
          duration: 0.3,
          ease: 'power3.out',
        });
      }

      items.forEach((item) => {
        item.classList.toggle('active', item.id === newLayout);
      });
    }

    function handleNavClick(e) {
      const item = e.target.closest('p');
      if (!item || !item.id) return;
      switchLayout(item.id);
    }

    nav.addEventListener('click', handleNavClick);
    // Listen to Lenis scroll emissions rather than generic window events
    lenis.on('scroll', handleScroll);

    return () => {
      document.body.classList.remove('colby-page');
      document.body.classList.remove('colby-can-scroll');

      cancelAnimationFrame(rafId);
      lenis.destroy();

      nav.removeEventListener('click', handleNavClick);
    };
  }, []);

  return (
    <div className="colby-body">
      <nav ref={navRef}>
        <div className="nav-item">
          <Link to="/work">
            <p>Back</p>
          </Link>
        </div>

        <div className="nav-item">
          <p id="layout-1-gallery">Gallery</p>
        </div>

        <div className="nav-item">
          <p id="layout-2-gallery">Detailed</p>
        </div>

        <div className="nav-item">
          <p id="layout-3-gallery">Info</p>
        </div>
      </nav>

  <div className="layout-3-text" ref={layoutTextRef}>
    <h1>Colby Soccer</h1>
        <p>
        A dynamic visual exploration of collegiate athletic identity, momentum, and 
        brand cohesion. Moving beyond standard sports promotion, this collection functions 
        as an intentional dive into narrative-driven graphic design—focusing on how 
        visual mediums can capture the high-stakes kinetic energy of Colby Men's Soccer 
        rather than relying on static game-day layouts.
        </p>

        <p>
        The creative direction relies heavily on a structured yet versatile visual hierarchy. 
        By utilizing variations in spatial layout—ranging from sharp diagonal slashes and 
        vertical typographic pillars to stacked "Double Header" split-frames—the work 
        avoids repetitive templating. Instead, each unique composition introduces a new 
        rhythm that adapts seamlessly to the specific narrative of the match, while 
        retaining a unified core identity.
        </p>

        <p>
        To establish a powerful, authoritative brand presence, the work leverages a meticulous, 
        monochromatic color theory deeply rooted in the institution's heritage. Pervasive 
        layers of Colby Blue are masterfully juxtaposed against crisp whites, subtle drop 
        shadows, and atmospheric smoke textures. This consistent palette, paired with recurring 
        brand elements like the Mule mascot silhouette, the stylized "C" crest, and distinct 
        opponent iconography, anchors the audience directly into a fierce, cinematic athletic 
        universe.
        </p>
  </div>
      <div className="gallery-container">
        <div className="gallery layout-1-gallery" ref={galleryRef}>
          {slides.map((slide, index) => (
            <div className="img" id={`img${index + 1}`} key={index}>
              <img src={slide} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="minimap" ref={minimapRef}></div>

      <div className="img-previews" ref={imgPreviewsRef}>
        {slides.map((slide, index) => (
          <img src={slide} alt="" key={index} />
        ))}
      </div>

      <FluidCanvas className = "gradient-canvas" colors={lightTheme}/>
    </div>
  );
}

const ColbyPage = transition(Colby);

export default ColbyPage;