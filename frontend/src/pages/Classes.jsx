import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClassCard from '../components/ClassCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Classes.css';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = ['All', 'Cardio', 'Strength', 'Yoga', 'HIIT', 'Boxing', 'CrossFit', 'Pilates'];

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes');
      setClasses(response.data);
      setFilteredClasses(response.data);
    } catch (error) {
      toast.error('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredClasses(classes);
    } else {
      setFilteredClasses(classes.filter(c => c.category === category));
    }
  };

  const handleEnroll = async (classId) => {
    if (!user) {
      toast.info('Please login to enroll in classes');
      navigate('/login');
      return;
    }

    try {
      await api.post(`/classes/${classId}/enroll`);
      toast.success('Successfully enrolled in class!');
      fetchClasses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll');
    }
  };

  return (
    <div className="classes-page">
      {/* Hero Section */}
      <section className="classes-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Our <span>Classes</span></h1>
          <p>Find the perfect class to match your fitness goals</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => handleFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : filteredClasses.length > 0 ? (
            <div className="grid grid-3">
              {filteredClasses.map((gymClass) => (
                <ClassCard 
                  key={gymClass._id} 
                  gymClass={gymClass} 
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No classes found</h3>
              <p>Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Schedule Section */}
      <section className="section schedule-section">
        <div className="container">
          <div className="section-title">
            <h2>Weekly <span>Schedule</span></h2>
            <p>Plan your workouts with our weekly class schedule</p>
          </div>
          <div className="schedule-table">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="time">6:00 AM</td>
                  <td>Yoga</td>
                  <td>HIIT</td>
                  <td>Yoga</td>
                  <td>HIIT</td>
                  <td>Yoga</td>
                  <td>CrossFit</td>
                </tr>
                <tr>
                  <td className="time">8:00 AM</td>
                  <td>Cardio</td>
                  <td>Strength</td>
                  <td>Cardio</td>
                  <td>Strength</td>
                  <td>Cardio</td>
                  <td>Boxing</td>
                </tr>
                <tr>
                  <td className="time">10:00 AM</td>
                  <td>Pilates</td>
                  <td>Boxing</td>
                  <td>Pilates</td>
                  <td>Boxing</td>
                  <td>Pilates</td>
                  <td>HIIT</td>
                </tr>
                <tr>
                  <td className="time">5:00 PM</td>
                  <td>HIIT</td>
                  <td>CrossFit</td>
                  <td>HIIT</td>
                  <td>CrossFit</td>
                  <td>HIIT</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td className="time">7:00 PM</td>
                  <td>Strength</td>
                  <td>Yoga</td>
                  <td>Strength</td>
                  <td>Yoga</td>
                  <td>Strength</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classes;