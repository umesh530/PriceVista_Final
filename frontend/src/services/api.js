// frontend/src/services/api.js
import axios from 'axios';

const BACKEND_BASE =
  import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

// create axios instance
const api = axios.create({
  baseURL: BACKEND_BASE,
  timeout: 20000,
});

// attach token automatically if available in localStorage
api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('pv_user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (e) {
    // ignore
  }
  return config;
}, (err) => Promise.reject(err));

export default api;
