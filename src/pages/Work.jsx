import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Work.css'
import FluidCanvas from '../components/FluidCanvas';
import transition from '../transitionGallery';

function Work() {
  return (
    <div className='Work'>
      <FluidCanvas className = "gradient-canvas"/>
      <h1>PROJECTS</h1>
      <div>
        <div className='project-block'>
          <div className='project-header'>
            <div className='project-title'>
              <h2>EPHEMERAL</h2>
            </div>
            <div className='work-links'>
              <Link to="/work/ephemeral"> VIEW </Link>
              <a href="https://www.instagram.com/ephemeral.nova/" target="_blank" rel="noopener noreferrer">
                INSTAGRAM
              </a>
            </div>
          </div>
          <div className='content'>
            <p>A visual exploration of distortion, memory, and digital impermanence that moves beyond minimalism into sensory-driven design. Centered around intimate, striking portraiture, the collection establishes an immediate psychological connection with the viewer. This moody, cinematic tension is brought to life through a high-contrast, late-night palette of deep blacks, glowing neons, and burning ambers that pulse with kinetic energy.</p>
          </div>
        </div>

        <div className='project-block'>
          <div className='project-header'>
            <div className='project-title'>
              <h2>COLBY SOCCER</h2>
            </div>
            <div className='work-links'>
              <Link to="/work/colby"> VIEW </Link>
              <a href="https://www.instagram.com/colbymsoccer/" target="_blank" rel="noopener noreferrer">
                INSTAGRAM
              </a>
            </div>
          </div>
          <div className='content'>
            <p>A dynamic visual exploration of collegiate athletic identity and momentum that shifts sports promotion into narrative-driven design. Utilizing sharp diagonal layouts, vertical typography, and split-frame compositions, the collection captures the high-stakes kinetic energy of the game without relying on repetitive templates. The work leverages a fierce, cinematic palette of institutional Colby Blue, crisp whites, and atmospheric textures to anchor the audience directly into the team's athletic universe.</p>
          </div>
        </div>


        <div className='project-block'>
          <div className='project-header'>
            <div className='project-title'>
              <h2>EAST COAST DRAGONS</h2>
            </div>
            <div className='work-links'>
              <Link to="/work/dragons"> VIEW </Link>
              <a href="https://eastcoastdragons.com/" target="_blank" rel="noopener noreferrer">
                SITE
              </a>
              <a href="https://github.com/aduan48/East-Coast-Dragons" target="_blank" rel="noopener noreferrer">
                GITHUB
              </a>
            </div>
          </div>
          <div className='content'>
            <p>A visual exploration of distortion, memory, and digital impermanence that moves beyond minimalism into sensory-driven design. Centered around intimate, striking portraiture, the collection establishes an immediate psychological connection with the viewer. This moody, cinematic tension is brought to life through a high-contrast, late-night palette of deep blacks, glowing neons, and burning ambers that pulse with kinetic energy.</p>
          </div>
        </div>

         <div className='project-block'>
          <div className='project-header'>
            <div className='project-title'>
              <h2>COLBY CLUB HOCKEY</h2>
            </div>
            <div className='work-links'>
              <Link to="/work/club-hockey"> VIEW </Link>
              <a href="https://colbyclubhockey.com/" target="_blank" rel="noopener noreferrer">
                SITE
              </a>
              <a href="https://github.com/aduan48/Colby-Club-Hockey-V2026" target="_blank" rel="noopener noreferrer">
                GITHUB
              </a>
            </div>
          </div>
          <div className='content'>
            <p>A visual exploration of distortion, memory, and digital impermanence that moves beyond minimalism into sensory-driven design. Centered around intimate, striking portraiture, the collection establishes an immediate psychological connection with the viewer. This moody, cinematic tension is brought to life through a high-contrast, late-night palette of deep blacks, glowing neons, and burning ambers that pulse with kinetic energy.</p>
          </div>
        </div>

        

      </div>
    </div>
  )
}

export default transition(Work)