import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000', // Replace with your backend API URL
  withCredentials: true, // Include cookies for session management
});

export default api;