import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 
import { Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Work from './pages/Work'
import Ephemeral from './pages/Ephemeral';
import Colby from './pages/Colby';
import ClubHockey from './pages/ClubHockey'
import Dragons from './pages/Dragons';
import About from './pages/About';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './ScrollToTop';

import FluidCanvas from './components/FluidCanvas';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Work />} />
        <Route path="/projects/ephemeral" element={<Ephemeral />} />
        <Route path="/projects/colby" element={<Colby />} />
        <Route path="/projects/club-hockey" element={<ClubHockey />} />
        <Route path="/projects/dragons" element={<Dragons />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App">
        <div className="orientation-blocker">
        <h1>ALEX DUAN PORTFOLIO</h1>
        <p>Please view this content on a horizontal screen.</p>
      </div>

      <Router>
        <ScrollToTop />
        <FluidCanvas className="gradient-canvas" />
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </div>
  )
}

export default App;