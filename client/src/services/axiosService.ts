import axios from "axios";
import AuthApi from "./authService";

const api = axios.create({
  baseURL: `http://localhost:3500/`,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 450 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await AuthApi.refreshTokens();
        return api(originalRequest);
      } catch (error) {
        await api.get("/auth/logout");
        localStorage.removeItem("accessToken");
        window.location.replace("/auth/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
