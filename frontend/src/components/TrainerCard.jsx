import React from 'react';
import { FaInstagram, FaPhone } from 'react-icons/fa';
import './TrainerCard.css';

const TrainerCard = ({ trainer }) => {
  const { name, image, specialization, experience, bio, phone, socialMedia } = trainer;

  return (
    <div className="trainer-card">
      <div className="trainer-image">
        <img src={image} alt={name} />
        <div className="trainer-overlay">
          <div className="social-links">
            {socialMedia?.instagram && (
              <a 
                href={socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} aria-label="Phone">
                <FaPhone />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="trainer-content">
        <h3>{name}</h3>
        <p className="experience">{experience} Years Experience</p>
        <p className="specialization">
          {specialization?.slice(0, 3).join(' • ')}
        </p>
        <p className="bio">{bio?.substring(0, 120)}...</p>
      </div>
    </div>
  );
};

export default TrainerCard;