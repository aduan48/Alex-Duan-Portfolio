import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isHidden = location.pathname === '/projects/ephemeral' || location.pathname === '/projects/colby' || location.pathname === '/projects/club-hockey' || location.pathname === '/projects/dragons';

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  // --- SCROLL TO CONTACT LOGIC ---
  const handleContactClick = (e) => {
    e.preventDefault(); 

    if (location.pathname === '/about') {
      const contactSection = document.getElementById('contact-section');
      contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/about', { state: { scrollToContact: true } });
    }
  };

  return (
    <div className={`navbar ${!openLinks ? 'menu-closed' : ''} ${isHidden ? 'hidden-nav' : ''}`}>
      <div className='leftSide'> 
        <Link to="/home"> PORTFOLIO </Link>
      </div>
      
      <div className='center' id={openLinks ? "open" : "close"}>
        <Link to="/home"> HOME </Link>
        
        {/* CHANGED: Swapped <Link> to an <a> tag with the custom click handler */}
        <Link to="/about"> ABOUT </Link>
        
        <Link to="/projects"> PROJECTS </Link>
        <a href="#contact" onClick={handleContactClick}> CONTACT </a>
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