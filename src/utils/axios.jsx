import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:5000`, // Replace with your backend API URL
  withCredentials: true, // Include cookies for session management
});

export default api;
// https://movie-backend-eaar.onrender.com