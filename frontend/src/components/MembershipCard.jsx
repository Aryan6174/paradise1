import React from 'react';
import { FaCheck, FaWhatsapp } from 'react-icons/fa';
import './MembershipCard.css';

const MembershipCard = ({ membership, onSubscribe }) => {
  const { _id, name, price, duration, features, isPopular } = membership;

  const getDurationText = () => {
    if (duration === 30) return 'month';
    if (duration === 60) return '2 months';
    if (duration === 90) return '3 months';
    if (duration === 180) return '6 months';
    if (duration === 365) return 'year';
    return `${duration} days`;
  };

  const pricePerMonth = Math.round(price / (duration / 30));

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${name} membership (₹${price}) at Paradise Gym. Please share more details.`
    );
    window.open(`https://wa.me/917014878955?text=${message}`, '_blank');
  };

  return (
    <div className={`membership-card ${isPopular ? 'popular' : ''}`}>
      {isPopular && <div className="popular-badge">Most Popular</div>}
      
      <div className="card-header">
        <h3>{name}</h3>
        <div className="price-box">
          <span className="currency">₹</span>
          <span className="amount">{price.toLocaleString('en-IN')}</span>
        </div>
        <p className="duration">for {getDurationText()}</p>
        {duration > 30 && (
          <p className="price-per-month">
            ₹{pricePerMonth.toLocaleString('en-IN')}/month
          </p>
        )}
      </div>
      
      <div className="card-features">
        <ul>
          {features?.slice(0, 5).map((feature, index) => (
            <li key={index}>
              <FaCheck className="check-icon" />
              <span>{feature}</span>
            </li>
          ))}
          {features?.length > 5 && (
            <li className="more-features">
              +{features.length - 5} more benefits
            </li>
          )}
        </ul>
      </div>

      <div className="card-action">
        <button 
          className={`btn ${isPopular ? 'btn-primary' : 'btn-secondary'}`}
          onClick={handleWhatsApp}
        >
          <FaWhatsapp /> Enquire Now
        </button>
      </div>
    </div>
  );
};

export default MembershipCard;