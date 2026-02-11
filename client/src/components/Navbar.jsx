import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img 
            src={logo}
            alt="Campus Repo Logo" 
            className="logo-image"
          />
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="#home" className="nav-link active">
            Home
          </a>
          
          <div 
            className="nav-link-dropdown"
            onMouseEnter={() => setIsArticlesOpen(true)}
            onMouseLeave={() => setIsArticlesOpen(false)}
          >
            <a href="#articles" className="nav-link">
              Articles
              <span className="dropdown-arrow">▼</span>
            </a>
            {isArticlesOpen && (
              <div className="dropdown-menu">
                <a href="#all-articles" className="dropdown-item">All Articles</a>
                <a href="#tech-events" className="dropdown-item">Tech Events</a>
                <a href="#projects" className="dropdown-item">Projects</a>
              </div>
            )}
          </div>

          <a href="#members" className="nav-link">
            Members
          </a>

          <a href="#about" className="nav-link">
            About
          </a>

          {/* Search Container */}
          <div className="search-container">
            <button 
              className="search-button" 
              onClick={handleSearchClick}
              aria-label="Search"
            >
              <svg 
                width="25" 
                height="25" 
                viewBox="0 0 25 25" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle 
                  cx="11" 
                  cy="11" 
                  r="7" 
                  stroke="#063F5C" 
                  strokeWidth="2"
                />
                <line 
                  x1="16" 
                  y1="16" 
                  x2="21" 
                  y2="21" 
                  stroke="#063F5C" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Search Input */}
            <div className={`search-input-wrapper ${isSearchOpen ? 'active' : ''}`}>
              <input 
                type="text" 
                className="search-input"
                placeholder="Search articles..."
                autoFocus={isSearchOpen}
              />
              <button 
                className="search-close"
                onClick={handleSearchClose}
                aria-label="Close search"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle (for future mobile responsiveness) */}
        <button className="mobile-menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;