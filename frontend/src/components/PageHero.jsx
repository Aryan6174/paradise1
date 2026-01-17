import React from 'react';
import './PageHero.css';

const PageHero = ({ title, subtitle, backgroundImage }) => {
  const defaultBg = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
  
  return (
    <section 
      className="page-hero"
      style={{ backgroundImage: `url(${backgroundImage || defaultBg})` }}
    >
      <div className="page-hero-overlay"></div>
      <div className="container">
        <div className="page-hero-content">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </section>
  );
};

export default PageHero;