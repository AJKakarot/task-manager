import axios from "axios";
import { clearStoredAuth, getStoredAuth } from "./storage.js";

class ApiError extends Error {
  constructor({ message, code, status, details }) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

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
    const responseData = error.response?.data;
    const status = error.response?.status;

    if (error.response?.status === 401) {
      clearStoredAuth();
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    const message =
      responseData?.message ||
      responseData?.error?.details?.[0]?.message ||
      error.message ||
      "Request failed";
    const code = responseData?.error?.code || "REQUEST_FAILED";
    const details = responseData?.error?.details || [];

    return Promise.reject(new ApiError({ message, code, status, details }));
  }
);

export default apiClient;
