// src/auth/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://73.156.34.219:8080', // Replace with your backend base URL
});

// Optional: attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
