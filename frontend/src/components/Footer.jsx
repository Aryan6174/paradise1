import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaDumbbell, 
  FaInstagram, 
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaClock
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-about">
            <Link to="/" className="footer-logo">
              <FaDumbbell className="logo-icon" />
              <span>Paradise <span className="accent">Gym</span></span>
            </Link>
            <p className="tagline">Get Fit & Great Look</p>
            <p>
              Established in 2010, Paradise Gym & Fitness Center is Jaipur's premier 
              fitness destination. With 15+ years of experience, we help you achieve 
              your fitness goals with expert guidance.
            </p>
            <div className="social-links">
              <a 
                href="https://instagram.com/laxmanmeena642" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Laxman Meena Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://instagram.com/siddharth1997fitness" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Siddharth Meena Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://wa.me/917014878955?text=Hi!%20I'm%20interested%20in%20joining%20Paradise%20Gym.%20Please%20share%20more%20details." 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/classes">Training Sessions</Link></li>
              <li><Link to="/trainers">Our Trainers</Link></li>
              <li><Link to="/membership">Membership Plans</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links">
            <h3>Our Services</h3>
            <ul>
              <li><Link to="/classes">Strength Training</Link></li>
              <li><Link to="/classes">Weight Loss Program</Link></li>
              <li><Link to="/classes">Muscle Building</Link></li>
              <li><Link to="/classes">Personal Training</Link></li>
              <li><Link to="/classes">Cardio Training</Link></li>
              <li><Link to="/classes">Diet & Nutrition</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <FaMapMarkerAlt />
                <span>
                  Patel Colony, Goner Mod,<br />
                  Sitapura, Jaipur,<br />
                  Rajasthan - 302022
                </span>
              </li>
              <li>
                <FaPhone />
                <span>
                  <a href="tel:+917014878955">+91 70148 78955</a><br />
                  <a href="tel:+918740062864">+91 87400 62864</a>
                </span>
              </li>
              <li>
                <FaWhatsapp />
                <span>
                  <a href="https://wa.me/917014878955">WhatsApp Us</a>
                </span>
              </li>
              <li>
                <FaClock />
                <span>
                  Mon - Sat: 5:00 AM - 10:00 PM<br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Maps */}
        <div className="footer-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113952.98962481042!2d75.71530827424618!3d26.80714389903013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc99f74d0ed9d%3A0x8f3fc46c4cc3b94!2sParadise%20gym!5e0!3m2!1sen!2sin!4v1768654429572!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Paradise Gym Location"
          ></iframe>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Paradise Gym & Fitness Center, Jaipur. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/refund">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;