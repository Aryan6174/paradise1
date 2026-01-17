import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for stored user on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Verify token exists
          if (parsedUser && parsedUser.token) {
            setUser(parsedUser);
            console.log('User restored from localStorage:', parsedUser.email);
          } else {
            localStorage.removeItem('user');
          }
        }
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      console.log('Attempting login for:', email);
      
      const response = await api.post('/auth/login', { email, password });
      const userData = response.data;
      
      console.log('Login response:', userData);
      
      if (userData && userData.token) {
        // Store user in state
        setUser(userData);
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('Login successful, user stored');
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || err.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  // Register function
  const register = async (name, email, password, phone) => {
    try {
      setError(null);
      console.log('Attempting registration for:', email);
      
      const response = await api.post('/auth/register', { 
        name, 
        email, 
        password, 
        phone 
      });
      const userData = response.data;
      
      console.log('Registration response:', userData);
      
      if (userData && userData.token) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('Registration successful');
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Registration error:', err);
      const message = err.response?.data?.message || err.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  // Logout function
  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
  };

  // Update profile function
  const updateProfile = async (data) => {
    try {
      setError(null);
      const response = await api.put('/auth/profile', data);
      const userData = response.data;
      
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      throw new Error('Invalid response');
    } catch (err) {
      console.error('Update profile error:', err);
      const message = err.response?.data?.message || err.message || 'Update failed';
      setError(message);
      return { success: false, message };
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!user.token;
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;