const axios = require('axios');

const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8080/v1',  // Ensure correct base URL
  timeout: 10000,  // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for logging or transforming requests if needed
api.interceptors.request.use(
  (request) => {
    console.log(`Starting Request to ${request.url}`, request);
    return request;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API call failed:', error.response ? error.response.data : error.message);
    return Promise.reject(error); // Forward error to calling functions
  }
);

module.exports = api;