import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Don't send cookies by default for API requests
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Only redirect to login if we're not already on the login page
      // and if the current location is available (client-side)
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        Cookies.remove("auth_token");
        Cookies.remove("current_user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
