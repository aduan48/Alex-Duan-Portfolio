import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Work.css'
import transition from '../transitionGallery';

const PROJECTS = [
  {
    title: "EAST COAST DRAGONS",
    view: "/projects/dragons",
    links: [
      { label: "SITE", href: "https://eastcoastdragons.com/" },
      { label: "GITHUB", href: "https://github.com/aduan48/East-Coast-Dragons" },
    ],
    description: "A sleek full-stack web experience built for the East Coast Dragons, blending sharp visual identity with functional infrastructure. The site uses modern React patterns and refined CSS styling to create an on-brand digital presence that feels fast, polished, and athletic. Beyond the frontend, it integrates a secure registration system with PayPal payments and a Google Sheets backend, turning the website into both a promotional platform and a streamlined operational tool for managing player data, payments, and tournament signups.",
  },
  {
    title: "COLBY CLUB HOCKEY",
    view: "/projects/club-hockey",
    links: [
      { label: "SITE", href: "https://colbyclubhockey.com/" },
      { label: "GITHUB", href: "https://github.com/aduan48/Colby-Club-Hockey-V2026" },
    ],
    description: "A polished full-stack web experience built for Colby Club Hockey, combining modern React architecture with adaptive styling, interactive 3D elements, and a clean athletic identity. The site creates a responsive digital presence that feels fast, dynamic, and on-brand, while giving users easy access to team information, schedules, rosters, and livestream links. Beyond the frontend, the platform uses Netlify Forms for serverless submission tracking, local storage to protect user inputs from accidental refreshes, and backend functions that separate raw schedule data from the client. By parsing external JSON files into interactive rosters and game timelines, the website becomes both a promotional home for the club and a functional tool for managing updates, player information, and team operations.",
  },
  {
    title: "COLBY SOCCER",
    view: "/projects/colby",
    links: [{ label: "INSTAGRAM", href: "https://www.instagram.com/colbymsoccer/" }],
    description: "A dynamic visual exploration of collegiate athletic identity and momentum that shifts sports promotion into narrative-driven design. Utilizing sharp diagonal layouts, vertical typography, and split-frame compositions, the collection captures the high-stakes kinetic energy of the game without relying on repetitive templates. The work leverages a fierce, cinematic palette of institutional Colby Blue, crisp whites, and atmospheric textures to anchor the audience directly into the team's athletic universe",
  },
  {
    title: "EPHEMERAL",
    view: "/projects/ephemeral",
    links: [{ label: "INSTAGRAM", href: "https://www.instagram.com/ephemeral.nova/" }],
    description: "A visual exploration of distortion, memory, and digital impermanence that moves beyond minimalism into sensory-driven design. Centered around intimate, striking portraiture, the collection establishes an immediate psychological connection with the viewer. This moody, cinematic tension is brought to life through a high-contrast, late-night palette of deep blacks, glowing neons, and burning ambers that pulse with kinetic energy.",
  },
  {
    title: "FREELANCE WORK",
    view: "/projects/freelance",
    links: [{ label: "INSTAGRAM", href: "https://www.instagram.com/dewprods/" }],
    description: "A collection of freelance sports design work, including gameday graphics for Colby Club Hockey and Needham High School along with athlete commitment announcements. Each piece is built to grab attention in the feed, pairing bold typography and dynamic compositions with each team's visual identity to celebrate big moments and keep fans engaged throughout the season.",
  },
];

function ProjectLinks({ project, className }) {
  return (
    <div className={className}>
      <Link to={project.view}> VIEW </Link>
      {project.links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      ))}
    </div>
  );
}

function Work() {
  const [activeProject, setActiveProject] = useState(0);
  const projectRefs = useRef([]);



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
      
      {/* MINIMALIST SIDEBAR MINIMAP */}
      <div className="work-minimap">
        <div className="minimap-track-wrapper">
          <div 
            className="minimap-progress-bar" 
            style={{ 
              height: `${(activeProject / (PROJECTS.length - 1)) * 100}%`
            }}
          ></div>
        </div>
        <div className="minimap-labels">
            {PROJECTS.map((project, idx) => (
              <div key={project.title} className={`minimap-node ${activeProject === idx ? 'active' : ''}`}
                  onClick={() => scrollToBlock(idx)}>
                <span className="node-number">{String(idx + 1).padStart(2, '0')}</span>
                <span className="node-title">{project.title}</span>
              </div>
            ))}
        </div>
      </div>


      <h1>PROJECTS</h1>

      {PROJECTS.map((project, idx) => (
        <div
          key={project.title}
          className="project-block"
          ref={(el) => (projectRefs.current[idx] = el)}
        >
          <div className="project-header">
            <div className="project-title">
              <h2>{project.title}</h2>
            </div>
            <ProjectLinks project={project} className="work-links" />
          </div>
          <ProjectLinks project={project} className="work-links-mobile" />
          <div className="content">
            <p>{project.description}</p>
          </div>
        </div>
      ))}


    </div>
  )
}

export default transition(Work)