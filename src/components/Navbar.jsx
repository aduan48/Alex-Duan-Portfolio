import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(true);
  const location = useLocation();
  const isHidden = location.pathname === '/projects/ephemeral' || location.pathname === '/projects/colby'  || location.pathname === '/projects/club-hockey'  || location.pathname === '/projects/dragons';


  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className={`navbar ${!openLinks ? 'menu-closed' : ''} ${isHidden ? 'hidden-nav' : ''}`}>
      <div className='leftSide'> 
        <Link to="/home"> PORTFOLIO </Link>
      </div>
      
      {/* Slides rightward to sandwich when closed */}
      <div className='center' id={openLinks ? "open" : "close"}>
        <Link to="/home"> HOME </Link>
        <Link to="/about"> ABOUT </Link>
        <Link to="/projects"> PROJECTS </Link>
        <Link to="/contact"> CONTACT
         </Link>
      </div>
      
      <div className='rightSide'> 

        
        <button onClick={toggleNavbar} className="toggle-btn">
          {openLinks ? '{HIDE}' : '{EXPAND}'}
        </button>
      </div>
    </div>
  );
}

export default Navbar;