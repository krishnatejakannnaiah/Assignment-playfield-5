import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'https://dummyjson.com/', 
});

// Request interceptor: Modify request configuration before sending
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle responses globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
