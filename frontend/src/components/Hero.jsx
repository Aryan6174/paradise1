import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">Since 2010 • 15+ Years of Excellence</div>
          <h1>
            Paradise Gym &<br />
            <span>Fitness Center</span>
          </h1>
          <p className="hero-tagline">Get Fit & Great Look</p>
          <p className="hero-description">
            Transform your body with Jaipur's most trusted fitness center. 
            Expert trainers, modern equipment, and personalized programs.
          </p>
          <div className="hero-buttons">
            <Link to="/membership" className="btn btn-primary">
              Join Now
            </Link>
            <a 
              href="https://wa.me/917014878955?text=Hi!%20I'm%20interested%20in%20joining%20Paradise%20Gym." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
            <a href="tel:+917014878955" className="btn btn-secondary">
              <FaPhone /> Call Now
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h3>1000+</h3>
              <p>Happy Members</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Equipment</p>
            </div>
            <div className="stat">
              <h3>2</h3>
              <p>Expert Trainers</p>
            </div>
          </div>
          
          <div className="hero-location">
            📍 Patel Colony, Goner Mod, Sitapura, Jaipur
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;