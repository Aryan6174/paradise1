import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaWhatsapp, 
  FaClock,
  FaInstagram,
  FaDirections
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/contact', formData);
      toast.success('Message sent successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Contact <span>Us</span></h1>
          <p>Get in touch with Paradise Gym & Fitness Center</p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="quick-contact">
        <div className="container">
          <div className="quick-contact-grid">
            <a href="tel:+917014878955" className="quick-card">
              <div className="quick-icon">
                <FaPhone />
              </div>
              <h3>Call Us</h3>
              <p>+91 70148 78955</p>
              <span>Laxman Meena</span>
            </a>
            
            <a href="tel:+918740062864" className="quick-card">
              <div className="quick-icon">
                <FaPhone />
              </div>
              <h3>Call Us</h3>
              <p>+91 87400 62864</p>
              <span>Siddharth Meena</span>
            </a>
            
            <a 
              href="https://wa.me/917014878955?text=Hi!%20I'm%20interested%20in%20joining%20Paradise%20Gym.%20Please%20share%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="quick-card whatsapp"
            >
              <div className="quick-icon">
                <FaWhatsapp />
              </div>
              <h3>WhatsApp</h3>
              <p>+91 70148 78955</p>
              <span>Chat with us</span>
            </a>
            
            <a 
              href="https://maps.app.goo.gl/ArorHQrzVEApYmk8A"
              target="_blank"
              rel="noopener noreferrer"
              className="quick-card"
            >
              <div className="quick-icon">
                <FaDirections />
              </div>
              <h3>Get Directions</h3>
              <p>Goner Mod, Sitapura</p>
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get In <span>Touch</span></h2>
              <p>
                Have questions about membership, training, or our facilities? 
                We're here to help! Visit us at our gym or reach out through 
                any of the following methods.
              </p>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="info-content">
                    <h3>Location</h3>
                    <p>
                      Patel Colony, Goner Mod,<br />
                      Sitapura, Jaipur,<br />
                      Rajasthan - 302022
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/ArorHQrzVEApYmk8A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <div className="info-content">
                    <h3>Phone Numbers</h3>
                    <p>
                      <a href="tel:+917014878955">+91 70148 78955</a> (Laxman Meena)<br />
                      <a href="tel:+918740062864">+91 87400 62864</a> (Siddharth Meena)
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <FaWhatsapp />
                  </div>
                  <div className="info-content">
                    <h3>WhatsApp</h3>
                    <p>
                      <a 
                        href="https://wa.me/917014878955"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +91 70148 78955
                      </a>
                    </p>
                    <span className="hint">Click to chat directly</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <div className="info-content">
                    <h3>Working Hours</h3>
                    <p>
                      Monday - Saturday: 5:00 AM - 10:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <FaInstagram />
                  </div>
                  <div className="info-content">
                    <h3>Follow Us</h3>
                    <p>
                      <a 
                        href="https://instagram.com/laxmanmeena642"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @laxmanmeena642
                      </a>
                      <br />
                      <a 
                        href="https://instagram.com/siddharth1997fitness"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @siddharth1997fitness
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send Us a <span>Message</span></h2>
                <p className="form-subtitle">
                  Fill the form below and we'll get back to you soon
                </p>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Membership Inquiry">Membership Inquiry</option>
                    <option value="Personal Training">Personal Training</option>
                    <option value="Trial Session">Trial Session Request</option>
                    <option value="Facilities">Facilities & Equipment</option>
                    <option value="Pricing">Pricing Information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us what you're looking for..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                <p className="form-note">
                  Or call us directly at <a href="tel:+917014878955">+91 70148 78955</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-title">
            <h2>Find <span>Us</span></h2>
            <p>Located at Goner Mod, Sitapura - Easy to reach from all parts of Jaipur</p>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113952.98962481042!2d75.71530827424618!3d26.80714389903013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc99f74d0ed9d%3A0x8f3fc46c4cc3b94!2sParadise%20gym!5e0!3m2!1sen!2sin!4v1768654429572!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Paradise Gym Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;