import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:5000`, // Backend URL
  withCredentials: true, // Include cookies for session management
});

export default api;
