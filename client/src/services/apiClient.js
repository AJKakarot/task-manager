import axios from "axios";
import { clearStoredAuth, getStoredAuth } from "./storage.js";

const apiBaseUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
  /\/$/,
  ""
);

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  const { token } = getStoredAuth();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredAuth();
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      "Request failed";

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
