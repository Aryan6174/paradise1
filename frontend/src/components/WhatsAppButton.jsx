import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = '917014878955';
  const message = encodeURIComponent(
    "Hi! I'm interested in joining Paradise Gym & Fitness Center. Please share more details about membership plans."
  );
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
      <span className="whatsapp-tooltip">Chat with us!</span>
    </a>
  );
};

export default WhatsAppButton;