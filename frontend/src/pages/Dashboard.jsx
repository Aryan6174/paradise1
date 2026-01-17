import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import { 
  FaUser, 
  FaDumbbell, 
  FaCalendarAlt, 
  FaCrown,
  FaEdit 
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      setProfile(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone || ''
      });
    } catch (error) {
      toast.error('Failed to load profile');
        } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    
    if (result.success) {
      toast.success('Profile updated successfully!');
      setEditing(false);
      fetchProfile();
    } else {
      toast.error(result.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Welcome, <span>{user?.name}</span></h1>
          <p>Manage your account, classes, and membership</p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="section dashboard-content">
        <div className="container">
          <div className="dashboard-grid">
            {/* Sidebar */}
            <div className="dashboard-sidebar">
              <div className="profile-card">
                <div className="profile-avatar">
                  <FaUser />
                </div>
                <h3>{profile?.name}</h3>
                <p>{profile?.email}</p>
                <span className={`role-badge ${profile?.role}`}>
                  {profile?.role}
                </span>
              </div>

              <nav className="dashboard-nav">
                <button className="nav-item active">
                  <FaUser /> Profile
                </button>
                <button className="nav-item">
                  <FaDumbbell /> My Classes
                </button>
                <button className="nav-item">
                  <FaCrown /> Membership
                </button>
                <button className="nav-item">
                  <FaCalendarAlt /> Schedule
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
              {/* Stats Cards */}
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaDumbbell />
                  </div>
                  <div className="stat-info">
                    <h4>{profile?.enrolledClasses?.length || 0}</h4>
                    <p>Enrolled Classes</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaCrown />
                  </div>
                  <div className="stat-info">
                    <h4>{profile?.membership?.name || 'None'}</h4>
                    <p>Current Plan</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="stat-info">
                    <h4>{formatDate(profile?.membershipExpiry)}</h4>
                    <p>Expiry Date</p>
                  </div>
                </div>
              </div>

              {/* Profile Section */}
              <div className="content-card">
                <div className="card-header">
                  <h2>Profile Information</h2>
                  <button 
                    className="edit-btn"
                    onClick={() => setEditing(!editing)}
                  >
                    <FaEdit /> {editing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {editing ? (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="profile-info">
                    <div className="info-row">
                      <span className="info-label">Full Name:</span>
                      <span className="info-value">{profile?.name}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{profile?.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{profile?.phone || 'Not provided'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Member Since:</span>
                      <span className="info-value">{formatDate(profile?.createdAt)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Enrolled Classes */}
              <div className="content-card">
                <div className="card-header">
                  <h2>My Enrolled Classes</h2>
                </div>
                {profile?.enrolledClasses?.length > 0 ? (
                  <div className="classes-list">
                    {profile.enrolledClasses.map((gymClass) => (
                      <div key={gymClass._id} className="class-item">
                        <div className="class-info">
                          <h4>{gymClass.name}</h4>
                          <p>
                            {gymClass.schedule?.day} | {gymClass.schedule?.startTime} - {gymClass.schedule?.endTime}
                          </p>
                        </div>
                        <span className={`category-tag ${gymClass.category?.toLowerCase()}`}>
                          {gymClass.category}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <FaDumbbell />
                    <p>You haven't enrolled in any classes yet.</p>
                    <a href="/classes" className="btn btn-secondary">
                      Browse Classes
                    </a>
                  </div>
                )}
              </div>

              {/* Membership Details */}
              <div className="content-card">
                <div className="card-header">
                  <h2>Membership Details</h2>
                </div>
                {profile?.membership ? (
                  <div className="membership-details">
                    <div className="membership-header">
                      <h3>{profile.membership.name}</h3>
                      <span className="price">${profile.membership.price}</span>
                    </div>
                    <div className="membership-features">
                      {profile.membership.features?.map((feature, index) => (
                        <div key={index} className="feature-item">
                          ✓ {feature}
                        </div>
                      ))}
                    </div>
                    <div className="membership-expiry">
                      <p>
                        <strong>Expires:</strong> {formatDate(profile.membershipExpiry)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <FaCrown />
                    <p>You don't have an active membership.</p>
                    <a href="/membership" className="btn btn-secondary">
                      View Plans
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;