import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore for secure token storage

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://192.168.39.100:3000', // Set your base URL here
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve the token from SecureStore
      const checkUser = await SecureStore.getItemAsync('jwtToken');

      if (checkUser) {
        // Attach the token as a Bearer token in the Authorization header
        config.headers.Authorization = `Bearer ${checkUser}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      // Optionally handle token retrieval errors (e.g., log out user or show an error)
    }
    return config;
  },
  (error) => {
    // Handle errors that occur before the request is sent
    return Promise.reject(error);
  }
);

export default api;
