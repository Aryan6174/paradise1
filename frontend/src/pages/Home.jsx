import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ClassCard from '../components/ClassCard';
import TrainerCard from '../components/TrainerCard';
import MembershipCard from '../components/MembershipCard';
import api from '../services/api';
import { 
  FaDumbbell, 
  FaHeartbeat, 
  FaUsers, 
  FaClock,
  FaArrowRight,
  FaWhatsapp,
  FaPhone,
  FaCheckCircle,
  FaMapMarkerAlt
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesRes, trainersRes, membershipsRes] = await Promise.all([
          api.get('/classes'),
          api.get('/trainers'),
          api.get('/memberships')
        ]);
        setClasses(classesRes.data.slice(0, 3));
        setTrainers(trainersRes.data);
        setMemberships(membershipsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: <FaDumbbell />,
      title: 'Modern Equipment',
      description: 'State-of-the-art cardio machines, free weights, and strength training equipment.'
    },
    {
      icon: <FaHeartbeat />,
      title: 'Personal Training',
      description: '15+ years experienced trainers to guide you through your fitness journey.'
    },
    {
      icon: <FaUsers />,
      title: 'Expert Guidance',
      description: 'Customized workout plans and diet consultation for every member.'
    },
    {
      icon: <FaClock />,
      title: 'Flexible Hours',
      description: 'Open from 5 AM to 10 PM, Monday to Saturday. Train at your convenience.'
    }
  ];

  const facilities = [
    'Cardio Equipment',
    'Strength Training Machines',
    'Free Weights Section',
    'Personal Training',
    'Locker Rooms',
    'Free Parking',
    'Diet & Nutrition Plans',
    'Progress Tracking'
  ];

  return (
    <div className="home-page">
      <Hero />

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose <span>Paradise Gym</span>?</h2>
            <p>Jaipur's trusted fitness destination since 2010</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section about-preview">
        <div className="container">
          <div className="about-grid">
            <div className="about-images">
              <div className="image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Paradise Gym Interior" 
                />
                <div className="experience-badge">
                  <span className="years">15+</span>
                  <span className="text">Years Experience</span>
                </div>
              </div>
            </div>
            <div className="about-content">
              <h2>Welcome to <span>Paradise Gym</span></h2>
              <p className="tagline">Get Fit & Great Look</p>
              <p>
                Established in 2010, Paradise Gym & Fitness Center has been transforming 
                lives in Jaipur for over 15 years. Located at Goner Mod, Sitapura, we 
                provide a complete fitness solution for everyone.
              </p>
              <p>
                Our experienced trainers, Laxman Meena and Siddharth Meena, bring 15+ 
                years of expertise to help you achieve your fitness goals, whether it's 
                weight loss, muscle building, or overall wellness.
              </p>
              
              <div className="facilities-box">
                <h4>Our Facilities:</h4>
                <ul className="facilities-list">
                  {facilities.map((facility, index) => (
                    <li key={index}>
                      <FaCheckCircle className="check-icon" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="about-buttons">
                <Link to="/about" className="btn btn-primary">
                  Learn More <FaArrowRight />
                </Link>
                <a 
                  href="https://wa.me/917014878955?text=Hi!%20I%20want%20to%20know%20more%20about%20Paradise%20Gym." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="section trainers-section">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our <span>Expert Trainers</span></h2>
            <p>15+ years of combined experience in fitness training</p>
          </div>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="trainers-grid">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sessions Section */}
      <section className="section classes-section">
        <div className="container">
          <div className="section-title">
            <h2>Training <span>Sessions</span></h2>
            <p>Specialized programs for all fitness levels</p>
          </div>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="classes-grid">
                {classes.map((gymClass) => (
                  <ClassCard key={gymClass._id} gymClass={gymClass} />
                ))}
              </div>
              <div className="section-cta">
                <Link to="/classes" className="btn btn-secondary">
                  View All Sessions <FaArrowRight />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Membership Section */}
      <section className="section membership-section">
        <div className="container">
          <div className="section-title">
            <h2>Membership <span>Plans</span></h2>
            <p>Affordable plans for everyone</p>
          </div>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="membership-wrapper">
              <div className="membership-grid">
                {memberships.map((membership) => (
                  <MembershipCard key={membership._id} membership={membership} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Location Section */}
      <section className="section location-section">
        <div className="container">
          <div className="section-title">
            <h2>Visit <span>Us</span></h2>
            <p>Conveniently located at Goner Mod, Sitapura</p>
          </div>
          <div className="location-grid">
            <div className="location-info">
              <div className="info-card">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <h4>Address</h4>
                  <p>Patel Colony, Goner Mod,<br />Sitapura, Jaipur,<br />Rajasthan - 302022</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <FaClock />
                </div>
                <div className="info-content">
                  <h4>Working Hours</h4>
                  <p>Monday - Saturday: 5:00 AM - 10:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-content">
                  <h4>Contact</h4>
                  <p>
                    <a href="tel:+917014878955">+91 70148 78955</a><br />
                    <a href="tel:+918740062864">+91 87400 62864</a>
                  </p>
                </div>
              </div>
              
              <a 
                href="https://maps.app.goo.gl/ArorHQrzVEApYmk8A" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FaMapMarkerAlt /> Get Directions
              </a>
            </div>
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113952.98962481042!2d75.71530827424618!3d26.80714389903013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc99f74d0ed9d%3A0x8f3fc46c4cc3b94!2sParadise%20gym!5e0!3m2!1sen!2sin!4v1768654429572!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '15px', minHeight: '350px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Paradise Gym Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Start Your <span>Fitness Journey</span>?</h2>
            <p>
              Join Paradise Gym today and transform your body with expert guidance.
              Call us or visit our gym at Goner Mod, Sitapura.
            </p>
            <div className="cta-buttons">
              <Link to="/membership" className="btn btn-primary">
                View Membership Plans
              </Link>
              <a 
                href="https://wa.me/917014878955?text=Hi!%20I%20want%20to%20join%20Paradise%20Gym.%20Please%20share%20membership%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <FaWhatsapp /> WhatsApp Now
              </a>
              <a href="tel:+917014878955" className="btn btn-secondary">
                <FaPhone /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;