import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BASEURL}`, // Backend URL
  withCredentials: true, // Include cookies for session management
});

export default api;
