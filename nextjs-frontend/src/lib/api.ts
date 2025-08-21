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
    console.log(
      "🌐 API Request:",
      config.method?.toUpperCase(),
      config.url,
      "Token:",
      !!token
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("🚨 API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(
      "✅ API Response:",
      response.config.method?.toUpperCase(),
      response.config.url,
      "Status:",
      response.status
    );
    return response;
  },
  (error: AxiosError) => {
    console.error(
      "🚨 API Response Error:",
      error.config?.method?.toUpperCase(),
      error.config?.url,
      "Status:",
      error.response?.status
    );
    console.error("🚨 Full error response:", error.response?.data);

    if (error.response?.status === 401) {
      console.log(
        "🚨 401 Unauthorized - Current location:",
        typeof window !== "undefined" ? window.location.pathname : "SSR"
      );

      // Only redirect to login if we're not already on the login page
      // and if the current location is available (client-side)
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        console.log("🚪 401 Error: Clearing auth and redirecting to login");
        Cookies.remove("auth_token");
        Cookies.remove("current_user");
        window.location.href = "/login";
      } else {
        console.log(
          "🔍 401 Error: Already on login page or SSR, not redirecting"
        );
      }
    }
    return Promise.reject(error);
  }
);

export default api;
