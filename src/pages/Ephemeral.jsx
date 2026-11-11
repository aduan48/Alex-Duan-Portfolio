import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import FluidCanvas from '../components/FluidCanvasBW';

import '../styles/Gallery.css';
import { Link } from 'react-router-dom';
import transition from '../transitionGallery';

import slide1 from '../ephemeral_portfolio/slide-1.webp';
import slide2 from '../ephemeral_portfolio/slide-2.webp';
import slide3 from '../ephemeral_portfolio/slide-3.webp';
import slide4 from '../ephemeral_portfolio/slide-4.webp';
import slide5 from '../ephemeral_portfolio/slide-5.webp';
import slide6 from '../ephemeral_portfolio/slide-6.webp';
import slide7 from '../ephemeral_portfolio/slide-7.webp';
import slide8 from '../ephemeral_portfolio/slide-8.webp';
import slide9 from '../ephemeral_portfolio/slide-9.webp';
import slide10 from '../ephemeral_portfolio/slide-10.webp';
import slide11 from '../ephemeral_portfolio/slide-11.webp';
import slide12 from '../ephemeral_portfolio/slide-12.webp';

// Lightweight 640px versions for the Gallery / Info views (sharper when shrunk)
import thumb1 from '../ephemeral_portfolio/thumbs/slide-1.webp';
import thumb2 from '../ephemeral_portfolio/thumbs/slide-2.webp';
import thumb3 from '../ephemeral_portfolio/thumbs/slide-3.webp';
import thumb4 from '../ephemeral_portfolio/thumbs/slide-4.webp';
import thumb5 from '../ephemeral_portfolio/thumbs/slide-5.webp';
import thumb6 from '../ephemeral_portfolio/thumbs/slide-6.webp';
import thumb7 from '../ephemeral_portfolio/thumbs/slide-7.webp';
import thumb8 from '../ephemeral_portfolio/thumbs/slide-8.webp';
import thumb9 from '../ephemeral_portfolio/thumbs/slide-9.webp';
import thumb10 from '../ephemeral_portfolio/thumbs/slide-10.webp';
import thumb11 from '../ephemeral_portfolio/thumbs/slide-11.webp';
import thumb12 from '../ephemeral_portfolio/thumbs/slide-12.webp';

gsap.registerPlugin(Flip, CustomEase, ScrollToPlugin);

CustomEase.create(
  'hop',
  'M0,0 C0.028,0.528 0.129,0.74 0.27,0.852 0.415,0.967 0.499,1 1,1'
);

const slides = [
  slide1, slide2, slide3, slide4, slide5, slide6,
  slide7, slide8, slide9, slide10, slide11, slide12,
];

const thumbs = [
  thumb1, thumb2, thumb3, thumb4, thumb5, thumb6, thumb7, thumb8, thumb9, thumb10, thumb11, thumb12,
];

// Theme class from Gallery.css ('theme-light' or 'theme-dark')
const THEME = 'theme-dark';

function Ephemeral() {
  const navRef = useRef(null);
  const galleryRef = useRef(null);
  const imgPreviewsRef = useRef(null);
  const minimapRef = useRef(null);
  const layoutTextRef = useRef(null);
  const activeLayoutRef = useRef('layout-1-gallery');
  const lenisRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('gallery-page', THEME);

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

    // Apply the 'active' class on initial load
    items.forEach((item) => {
      item.classList.toggle('active', item.id === activeLayoutRef.current);
    });

    function enableLayout2Scroll() {
      document.body.classList.add('gallery-can-scroll');

      requestAnimationFrame(() => {
        lenis.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
        lenis.start();
        handleScroll();
      });
    }

    function disableLayout2Scroll() {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
      window.scrollTo(0, 0);

      document.body.classList.remove('gallery-can-scroll');
    }

    // Start disabled (initial layout is 1)
    disableLayout2Scroll();

    function handleScroll() {
      if (activeLayoutRef.current !== 'layout-2-gallery') return;

      const previewImages = imgPreviews.querySelectorAll('img');
      const galleryItems = gallery.querySelectorAll('.img');
      if (!previewImages.length || !galleryItems.length) return;

      const scrollY = lenis.scroll || window.scrollY || 0;

      const totalPreviewHeight = imgPreviews.scrollHeight - window.innerHeight;
      if (totalPreviewHeight <= 0) return;

      const scrollProgress = Math.max(0, Math.min(scrollY / totalPreviewHeight, 1));

      const singleThumbHeight = galleryItems[0].offsetHeight;
      const singleThumbMargin = parseFloat(
        window.getComputedStyle(galleryItems[0]).marginBottom || 0
      );
      const thumbStep = singleThumbHeight + singleThumbMargin;

      // Shift just far enough to bring the last thumb to the top
      const totalGalleryTravel = (galleryItems.length - 1) * thumbStep;
      const galleryTranslateY = -scrollProgress * totalGalleryTravel;

      gsap.to(gallery, {
        y: Math.round(galleryTranslateY),
        ease: 'power2.out',
        duration: 0.2,
        snap: 'y', // whole pixels only, so thumbnails never sit on a half-pixel
      });
    }

    function switchLayout(newLayout) {
      if (newLayout === activeLayoutRef.current) return;

      // Smooth scroll up before switching if coming from Layout 2
      if (
        activeLayoutRef.current === 'layout-2-gallery' &&
        (window.scrollY > 5 || lenis.scroll > 5)
      ) {
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

      const staggerValue = isLayout2 ? 0 : 0.025;

      Flip.from(state, {
        duration: 1.5,
        ease: 'hop',
        stagger: staggerValue,
        // Drop leftover transforms once the move ends, so images render crisp
        onComplete: () => gsap.set(gallery.querySelectorAll('.img'), { clearProps: 'transform' }),
      });

      activeLayoutRef.current = newLayout;

      if (isLayout2) {
        enableLayout2Scroll();
        gsap.to([imgPreviews, minimap], { autoAlpha: 1, duration: 0.3, delay: 0.5 });
      } else {
        disableLayout2Scroll();
        gsap.to([imgPreviews, minimap], { autoAlpha: 0, duration: 0.3 });
        gsap.set(gallery, { clearProps: 'y' });
      }

      if (newLayout === 'layout-3-gallery') {
        gsap.to(layoutText, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' });
      } else {
        gsap.to(layoutText, { autoAlpha: 0, y: 20, duration: 0.3, ease: 'power3.out' });
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
    lenis.on('scroll', handleScroll);

    return () => {
      document.body.classList.remove('gallery-page', THEME, 'gallery-can-scroll');

      cancelAnimationFrame(rafId);
      lenis.destroy();

      nav.removeEventListener('click', handleNavClick);
    };
  }, []);

  return (
    <div className="gallery-body">
      <nav ref={navRef}>
        <div className="nav-item back-btn">
          <Link to="/projects">
            <p>MORE PROJECTS</p>
          </Link>
        </div>

        <div className="nav-item">
          <p id="layout-1-gallery">GALLERY</p>
        </div>

        <div className="nav-item">
          <p id="layout-2-gallery">DETAILED</p>
        </div>

        <div className="nav-item">
          <p id="layout-3-gallery">INFO</p>
        </div>
      </nav>

      <div className="layout-3-text" ref={layoutTextRef}>
        <h1>EPHEMERAL</h1>
        <p>
          A visual exploration of distortion, memory, and digital impermanence.
          Moving past structural minimalism, this collection functions as an
          intentional dive into sensory-driven graphic design—focusing on how
          visual mediums can capture a visceral human emotion rather than
          relying on static, flat layouts.
        </p>

        <p>
          The creative direction relies heavily on the power of the gaze. By centering
          each composition around striking, intimate portraiture, an immediate psychological
          connection is forged with the viewer. This look acts as an anchor point,
          pulling the audience directly into the design's distinct, atmospheric universe.
        </p>

        <p>
          To establish this moody, cinematic tension, the work leverages vivid, high-contrast
          color theory. Deep, velvety blacks are juxtaposed against glowing neon magentas,
          electric blues, and burning amber gradients. These complementary color pairings
          produce a rich, late-night aesthetic filled with an underlying kinetic energy.
        </p>
      </div>

      <div className="gallery-container">
        <div className="gallery layout-1-gallery" ref={galleryRef}>
          {thumbs.map((thumb, index) => (
            <div className="img" id={`img${index + 1}`} key={index}>
              <img src={thumb} alt="" decoding="async" />
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

      <FluidCanvas className="gradient-canvas" />
    </div>
  );
}

const EphemeralPage = transition(Ephemeral);

export default EphemeralPage;
