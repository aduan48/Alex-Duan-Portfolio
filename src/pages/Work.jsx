import React from 'react'
import { Link } from 'react-router-dom'
import transition from '../transition';

function Work() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>PROJECTS</h1>
      <p>Hello world</p>
      
      {/* This button will change the URL to /work/ephemeral without reloading the page */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/work/ephemeral">
          <button>
            View Ephemeral Work
          </button>
        </Link>
      </div>
    </div>
  )
}

export default transition(Work)