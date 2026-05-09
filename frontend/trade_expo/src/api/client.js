import axios from 'axios';

// The base URL can be moved to a .env file later
// Using proxy path for development
// Force the frontend to talk directly to the working Render backend
const RENDER_BACKEND_URL = "https://indiglobal-backend-staging.onrender.com/api";

console.log("--- API CLIENT DIRECT CONNECT ---");
console.log("Targeting Backend at:", RENDER_BACKEND_URL);

const apiClient = axios.create({
  baseURL: RENDER_BACKEND_URL,
});

// Request Interceptor: Attach JWT Token to every request
apiClient.interceptors.request.use(
  (config) => {
    console.log(`📡 Sending ${config.method.toUpperCase()} to: ${config.baseURL}${config.url}`);
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user && user.token && user.token !== 'null' && user.token !== 'undefined') {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request detected (401).");
      // Removing automatic redirect to /tickets to allow debugging
    }
    return Promise.reject(error);
  }
);

export default apiClient;
