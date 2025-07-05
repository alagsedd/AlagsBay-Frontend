// src/services/api-client.ts - THIS IS NOW CORRECT
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://alagsbay-backend-1.onrender.com/", // Correct: Trailing slash is added
  // Headers are not set statically here, which is correct
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Correct: Dynamically fetches token
    if (token) {
      config.headers.Authorization = `JWT ${token}`;// Correct: Sets Authorization header with Bearer
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;