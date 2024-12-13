import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://192.168.39.100:3000', // Set your base URL here
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  async (config) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJ1c2VyTmFtZSI6IlN1cGlwaSIsInVzZXJUeXBlIjoiUEFSRU5UIiwibmljTm8iOiIxMjM0NTY3ODkiLCJpYXQiOjE3MzQwODk5NTQsImV4cCI6MTczNDA5MDU1NH0.E4aBuUn3KU81iGLzMK-PnbiCZ0azrtnkQ-bAJUuMbwU'; // Replace with actual token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default api;
