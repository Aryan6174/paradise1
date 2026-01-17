import React from 'react';
import { FaClock, FaUsers, FaFire } from 'react-icons/fa';
import './ClassCard.css';

const ClassCard = ({ gymClass, onEnroll }) => {
  const { 
    name, 
    description, 
    image, 
    schedule, 
    capacity, 
    enrolledMembers, 
    difficulty, 
    category,
    trainer 
  } = gymClass;

  const spotsLeft = capacity - (enrolledMembers?.length || 0);

  return (
    <div className="class-card card">
      <div className="class-image">
        <img src={image} alt={name} />
        <span className={`difficulty ${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
        <span className="category">{category}</span>
      </div>
      <div className="class-content">
        <h3>{name}</h3>
        <p className="description">{description}</p>
        
        <div className="class-meta">
          <div className="meta-item">
            <FaClock />
            <span>{schedule.day} {schedule.startTime} - {schedule.endTime}</span>
          </div>
          <div className="meta-item">
            <FaUsers />
            <span>{spotsLeft} spots left</span>
          </div>
          <div className="meta-item">
            <FaFire />
            <span>{trainer?.name || 'TBA'}</span>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-block"
          onClick={() => onEnroll && onEnroll(gymClass._id)}
          disabled={spotsLeft === 0}
        >
          {spotsLeft === 0 ? 'Class Full' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
};

export default ClassCard;