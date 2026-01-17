import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MembershipCard from '../components/MembershipCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FaCheck, FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Membership.css';

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await api.get('/memberships');
        setMemberships(response.data);
      } catch (error) {
        toast.error('Failed to load memberships');
      } finally {
        setLoading(false);
      }
    };
    fetchMemberships();
  }, []);

  const handleSubscribe = async (membershipId) => {
    if (!user) {
      toast.info('Please login to subscribe');
      navigate('/login');
      return;
    }

    // Since online payment is not required, redirect to contact
    const membership = memberships.find(m => m._id === membershipId);
    const message = encodeURIComponent(
      `Hi! I want to take the ${membership?.name} membership at Paradise Gym. Please share the details.`
    );
    window.open(`https://wa.me/917014878955?text=${message}`, '_blank');
  };

  const allFeatures = [
    'Full gym access during working hours',
    'All cardio equipment',
    'All strength training machines',
    'Free weights access',
    'Locker room access',
    'Free parking',
    'Trainer guidance',
    'Diet consultation',
    'Progress tracking',
    'Clean & hygienic environment'
  ];

  return (
    <div className="membership-page">
      {/* Hero Section */}
      <section className="membership-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Membership <span>Plans</span></h1>
          <p>Affordable fitness plans for everyone</p>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="pricing-note">
        <div className="container">
          <div className="note-content">
            <h3>💪 All Memberships Include Full Access</h3>
            <p>
              Every membership plan includes access to all gym facilities, equipment, 
              and trainer guidance. Choose the duration that suits you best!
            </p>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Choose Your <span>Plan</span></h2>
            <p>Simple, transparent pricing with no hidden charges</p>
          </div>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="membership-grid">
              {memberships.map((membership) => (
                <MembershipCard 
                  key={membership._id} 
                  membership={membership}
                  onSubscribe={handleSubscribe}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Features Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-title">
            <h2>What's <span>Included</span></h2>
            <p>Every membership comes with these benefits</p>
          </div>
          <div className="features-grid">
            {allFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <FaCheck className="check-icon" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="section join-section">
        <div className="container">
          <div className="section-title">
            <h2>How to <span>Join</span></h2>
            <p>Simple steps to start your fitness journey</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Contact Us</h3>
              <p>Call or WhatsApp us to inquire about membership</p>
              <a href="tel:+917014878955" className="step-link">
                <FaPhone /> +91 70148 78955
              </a>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Visit Our Gym</h3>
              <p>Come to our gym for a tour and consultation</p>
              <a 
                href="https://maps.app.goo.gl/ArorHQrzVEApYmk8A"
                target="_blank"
                rel="noopener noreferrer"
                className="step-link"
              >
                <FaMapMarkerAlt /> Get Directions
              </a>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Choose Plan</h3>
              <p>Select a membership plan that suits your needs</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Start Training</h3>
              <p>Begin your fitness journey with expert guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked <span>Questions</span></h2>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What are the gym timings?</h3>
              <p>
                We are open Monday to Saturday from 5:00 AM to 10:00 PM. 
                Sunday is a holiday.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is there a trial session available?</h3>
              <p>
                Yes! Visit our gym and we'll give you a tour of our facilities. 
                Contact us to schedule your visit.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you provide diet plans?</h3>
              <p>
                Yes, diet and nutrition consultation is included with all 
                membership plans. Our trainers will guide you based on your goals.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is personal training included?</h3>
              <p>
                Basic trainer guidance is included in all plans. For dedicated 
                one-on-one personal training, please ask about our PT packages.
              </p>
            </div>
            <div className="faq-item">
              <h3>What payment methods are accepted?</h3>
              <p>
                We accept cash, UPI, and bank transfers. Payment is made at the 
                gym when you visit us.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I freeze my membership?</h3>
              <p>
                Yes, for 6-month and yearly memberships, you can freeze your 
                membership for valid reasons. Contact us for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get <span>Started</span>?</h2>
            <p>
              Contact us today to join Paradise Gym. Visit us at Goner Mod, 
              Sitapura or call/WhatsApp for more information.
            </p>
            <div className="cta-buttons">
              <a 
                href="https://wa.me/917014878955?text=Hi!%20I%20want%20to%20join%20Paradise%20Gym.%20Please%20share%20membership%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <FaWhatsapp /> WhatsApp Now
              </a>
              <a href="tel:+917014878955" className="btn btn-primary">
                <FaPhone /> Call +91 70148 78955
              </a>
            </div>
            <p className="cta-address">
              📍 Patel Colony, Goner Mod, Sitapura, Jaipur - 302022
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;