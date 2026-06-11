import React from 'react'
import { Link } from 'react-router-dom'
import transition from '../transition';
import '../styles/Work.css'

function Work() {
  return (
    <div className='Work'>
      <h1>PROJECTS</h1>
      <p>Hello world</p>
      
      {/* This button will change the URL to /work/ephemeral without reloading the page */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/work/ephemeral">
          <button>
            View Ephemeral Work
          </button>
        </Link>
        <Link to="/work/colby">
          <button>
            View Colby Work
          </button>
        </Link>
      </div>
    </div>
  )
}

export default transition(Work)