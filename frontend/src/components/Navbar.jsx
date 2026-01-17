import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaDumbbell } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <FaDumbbell className="logo-icon" />
          <span>Paradise <span className="accent">Gym</span></span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/classes" onClick={closeMenu}>Sessions</Link></li>
            <li><Link to="/trainers" onClick={closeMenu}>Trainers</Link></li>
            <li><Link to="/membership" onClick={closeMenu}>Membership</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>

          <div className="nav-auth">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-secondary" onClick={closeMenu}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>

        <button className="nav-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;