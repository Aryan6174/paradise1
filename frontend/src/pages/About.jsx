import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTrophy, 
  FaUsers, 
  FaDumbbell, 
  FaClock,
  FaCheckCircle,
  FaWhatsapp,
  FaPhone,
  FaArrowRight
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const stats = [
    { icon: <FaClock />, number: '15+', label: 'Years Experience' },
    { icon: <FaUsers />, number: '1000+', label: 'Happy Members' },
    { icon: <FaDumbbell />, number: '50+', label: 'Equipment' },
    { icon: <FaTrophy />, number: '100%', label: 'Dedication' }
  ];

  const facilities = [
    'Cardio Equipment (Treadmills, Cycles, Cross-trainers)',
    'Strength Training Machines',
    'Free Weights (Dumbbells, Barbells, Plates)',
    'Dedicated Stretching Area',
    'Personal Training Zone',
    'Locker Rooms with Storage',
    'Free Parking Space',
    'Clean & Hygienic Environment'
  ];

  const services = [
    {
      title: 'Weight Loss Program',
      description: 'Customized workout and diet plans to help you lose weight effectively and sustainably.'
    },
    {
      title: 'Muscle Building',
      description: 'Progressive strength training programs designed to build lean muscle mass.'
    },
    {
      title: 'Strength Training',
      description: 'Focus on compound movements and proper form to build functional strength.'
    },
    {
      title: 'Personal Training',
      description: 'One-on-one sessions with expert trainers for personalized guidance.'
    },
    {
      title: 'Diet & Nutrition',
      description: 'Customized diet plans based on your fitness goals and lifestyle.'
    },
    {
      title: 'Progress Tracking',
      description: 'Regular body composition analysis and progress monitoring.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">Since 2010</div>
            <h1>About <span>Paradise Gym</span></h1>
            <p>Get Fit & Great Look - Jaipur's Trusted Fitness Destination</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our <span>Story</span></h2>
              <p>
                <strong>Paradise Gym & Fitness Center</strong> was established in 2010 
                with a simple mission: to provide quality fitness training to the people 
                of Jaipur at affordable prices. What started as a small gym has now 
                grown into one of the most trusted fitness centers in Sitapura area.
              </p>
              <p>
                Founded by <strong>Mr. Laxman Meena</strong>, Paradise Gym has been 
                helping people transform their bodies and lives for over 15 years. 
                With experienced trainers and modern equipment, we've helped more 
                than 1000+ members achieve their fitness goals.
              </p>
              <p>
                Located at <strong>Goner Mod, Sitapura</strong>, our gym is easily 
                accessible and provides a comfortable, motivating environment for 
                people of all fitness levels.
              </p>
              
              <div className="owner-info">
                <h4>Led by Experienced Trainers:</h4>
                <ul>
                  <li>
                    <strong>Laxman Meena</strong> - 15+ years experience in strength 
                    training, weight loss, and muscle building
                  </li>
                  <li>
                    <strong>Siddharth Meena</strong> - 15+ years experience in fat loss, 
                    strength conditioning, and wellness
                  </li>
                </ul>
              </div>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Paradise Gym Interior"
              />
              <div className="experience-badge">
                <span className="years">15+</span>
                <span className="text">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="section facilities-section">
        <div className="container">
          <div className="facilities-grid">
            <div className="facilities-image">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gym Equipment"
              />
            </div>
            <div className="facilities-content">
              <h2>Our <span>Facilities</span></h2>
              <p>
                Paradise Gym is equipped with everything you need for a complete 
                workout. Our gym features modern equipment maintained in excellent 
                condition for your safety and comfort.
              </p>
              <ul className="facilities-list">
                {facilities.map((facility, index) => (
                  <li key={index}>
                    <FaCheckCircle className="check-icon" />
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <div className="section-title">
            <h2>Our <span>Services</span></h2>
            <p>Comprehensive fitness solutions for all your needs</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-number">0{index + 1}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timings Section */}
      <section className="section timings-section">
        <div className="container">
          <div className="timings-grid">
            <div className="timings-content">
              <h2>Gym <span>Timings</span></h2>
              <p>We're open 6 days a week with extended hours for your convenience</p>
              
              <div className="timings-table">
                <div className="timing-row">
                  <span className="day">Monday - Saturday</span>
                  <span className="time">5:00 AM - 10:00 PM</span>
                </div>
                <div className="timing-row closed">
                  <span className="day">Sunday</span>
                  <span className="time">Closed</span>
                </div>
                <div className="timing-row">
                  <span className="day">Public Holidays</span>
                  <span className="time">To be announced</span>
                </div>
              </div>

              <div className="timings-note">
                <p>
                  <strong>Note:</strong> Best time for beginners is morning (6 AM - 9 AM) 
                  or evening (4 PM - 7 PM) when trainers can give more personal attention.
                </p>
              </div>
            </div>
            <div className="timings-cta">
              <h3>Ready to Start?</h3>
              <p>Visit us today or contact us to learn more about our membership plans.</p>
              <div className="cta-buttons">
                <a href="tel:+917014878955" className="btn btn-primary">
                  <FaPhone /> Call Now
                </a>
                <a 
                  href="https://wa.me/917014878955?text=Hi!%20I%20want%20to%20know%20about%20Paradise%20Gym%20timings%20and%20membership."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
              <p className="address">
                📍 Patel Colony, Goner Mod, Sitapura, Jaipur - 302022
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section about-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Join the <span>Paradise Gym</span> Family</h2>
            <p>
              Start your fitness journey with Jaipur's most trusted gym. 
              With 15+ years of experience and 1000+ happy members, 
              we're here to help you achieve your goals!
            </p>
            <div className="cta-buttons">
              <Link to="/membership" className="btn btn-primary">
                View Membership Plans <FaArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;