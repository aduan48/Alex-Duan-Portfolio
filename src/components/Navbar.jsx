import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(true);
  const location = useLocation();
  const isEphemeralPage = location.pathname === '/work/ephemeral' || location.pathname === '/work/colby';


  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className={`navbar ${!openLinks ? 'menu-closed' : ''} ${isEphemeralPage ? 'hidden-nav' : ''}`}>
      <div className='leftSide'> 
        <Link to="/home"> PORTFOLIO </Link>
      </div>
      
      {/* Slides rightward to sandwich when closed */}
      <div className='center' id={openLinks ? "open" : "close"}>
        <Link to="/home"> HOME </Link>
        <Link to="/about"> ABOUT </Link>
        <Link to="/work"> WORK </Link>
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