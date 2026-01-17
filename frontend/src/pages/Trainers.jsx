import React, { useState, useEffect } from 'react';
import TrainerCard from '../components/TrainerCard';
import api from '../services/api';
import { toast } from 'react-toastify';
import './Trainers.css';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await api.get('/trainers');
        setTrainers(response.data);
      } catch (error) {
        toast.error('Failed to load trainers');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="trainers-page">
      {/* Hero Section */}
      <section className="trainers-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Our <span>Trainers</span></h1>
          <p>Meet our team of expert fitness professionals</p>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : trainers.length > 0 ? (
            <div className="grid grid-4">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No trainers available</h3>
              <p>Please check back later</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Our Trainers Section */}
      <section className="section why-trainers">
        <div className="container">
          <div className="section-title">
            <h2>Why Our <span>Trainers</span>?</h2>
            <p>What makes our team stand out</p>
          </div>
          <div className="grid grid-3">
            <div className="why-card">
              <h3>Certified Experts</h3>
              <p>
                All our trainers hold recognized certifications and undergo 
                continuous professional development.
              </p>
            </div>
            <div className="why-card">
              <h3>Personalized Approach</h3>
              <p>
                Our trainers create customized workout plans tailored to your 
                specific goals and fitness level.
              </p>
            </div>
            <div className="why-card">
              <h3>Ongoing Support</h3>
              <p>
                Get continuous guidance, motivation, and support throughout 
                your fitness journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trainers;