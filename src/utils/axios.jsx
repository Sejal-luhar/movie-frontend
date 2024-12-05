import axios from 'axios';

const api = axios.create({
  baseURL: `https://movie-backend-eaar.onrender.com`, // Replace with your backend API URL
  withCredentials: true, // Include cookies for session management
});

export default api;