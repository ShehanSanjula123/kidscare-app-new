import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://192.168.139.100:3000', // Set your base URL here
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  async (config) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJ1c2VyTmFtZSI6IlN1cGlwaSIsInVzZXJUeXBlIjoiUEFSRU5UIiwibmljTm8iOiIxMjM0NTY3ODkiLCJpYXQiOjE3MzM0ODgyOTAsImV4cCI6MTczMzQ4ODg5MH0.w6CUZ1W0YClRsI598RykicQMrNIono6bqNfIS1FULq8'; // Replace with actual token retrieval logic
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
