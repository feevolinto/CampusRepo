import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample featured articles data (replace with your actual data later)
  const featuredArticles = [
    {
      id: 1,
      image: '/placeholder-hero-1.jpg',
      tag: 'Event',
      headline: 'HAMMER LOREM: Lorem ipsum dolor sit amet, lorem ipsum dolor sit',
      author: 'Feevol Info',
      eventType: 'Event',
      date: 'February 17, 2026',
      lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et metus blandit mi lectus. Fusce tincidunt lorem ac vulputate vestibulum. Aliquam blandit lectus vitae suscipit tempus.',
    },
    {
      id: 2,
      image: '/placeholder-hero-2.jpg',
      tag: 'Event',
      headline: 'AI HACKATHON MSME EDITION: Blockchain for Future',
      author: 'Tech Fest',
      eventType: 'Event',
      date: 'February 15, 2026',
      lead: 'Join us for an exciting hackathon focused on blockchain technology and its applications in modern enterprise systems.',
    },
    {
      id: 3,
      image: '/placeholder-hero-3.jpg',
      tag: 'Project',
      headline: 'Student Community Innovation: Building Tomorrow Together',
      author: 'Campus Initiative',
      eventType: 'Project',
      date: 'February 10, 2026',
      lead: 'Discover how our students are creating innovative solutions to real-world problems through collaborative projects.',
    },
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? featuredArticles.length - 1 : prev - 1
    );
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Featured Articles Carousel */}
        <div className="hero-carousel">
          <div className="carousel-wrapper">
            {featuredArticles.map((article, index) => (
              <div
                key={article.id}
                className={`carousel-slide ${
                  index === currentSlide ? 'active' : ''
                }`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${article.image})`,
                }}
              >
                <div className="slide-content">
                  <div className="slide-tag">
                    <span className="tag-text">{article.tag}</span>
                  </div>
                  
                  <h1 className="slide-headline">{article.headline}</h1>
                  
                  <div className="slide-meta">
                    <span className="meta-credits">{article.author}</span>
                    <span className="meta-divider">•</span>
                    <span className="meta-event">{article.eventType}</span>
                    <span className="meta-divider">•</span>
                    <span className="meta-date">{article.date}</span>
                  </div>
                  
                  <p className="slide-lead">{article.lead}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Arrows */}
          <button 
            className="carousel-arrow carousel-arrow-right" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="navigation-cards">
          <a href="#events" className="nav-card nav-card-events">
            <div className="nav-card-content">
              <h3 className="nav-card-title">Events</h3>
              <p className="nav-card-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et metus blandit mi lectus ut malesuada.
              </p>
              <span className="nav-card-arrow">›</span>
            </div>
          </a>

          <a href="#projects" className="nav-card nav-card-projects">
            <div className="nav-card-content">
              <h3 className="nav-card-title">Projects</h3>
              <p className="nav-card-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et metus blandit mi lectus ut malesuada.
              </p>
              <span className="nav-card-arrow">›</span>
            </div>
          </a>

          <a href="#members" className="nav-card nav-card-members">
            <div className="nav-card-content">
              <h3 className="nav-card-title">Members</h3>
              <p className="nav-card-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et metus blandit mi lectus ut malesuada.
              </p>
              <span className="nav-card-arrow">›</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;