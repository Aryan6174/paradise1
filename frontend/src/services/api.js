/* eslint-disable no-undef */
import axios from 'axios';

const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api';

const API = axios.create({
  baseURL: API_URL,
});

// Add token to every request automatically
API.interceptors.request.use((req) => {
  try {
    // ✅ Get token from user object in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (err) {
    console.error('Error getting token:', err);
  }
  return req;
});

export default API;
