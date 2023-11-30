import { create } from "apisauce";
import { apiMonitor } from "./monitor";

export const URIS = {
  /* Projects */
  PROJECTS: "/project",
  GET_PROJECTS: "/project/all",

  /* Upload */
  UPLOAD: "/uploads",
  GET_UPLOAD: "/uploads/all",
};

let api = create({
  // baseURL: "https://busy-erin-viper-vest.cyclic.app",
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  timeout: 50000,
});
api.addMonitor(apiMonitor);
api.axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalRequest = error.config;
    let isunauth = error.response && error.response.status === 401;
    if (isunauth && !originalRequest._retry && !originalRequest.headers._retry) {
      originalRequest._retry = true;
    } else {
      return Promise.resolve(error);
    }
  }
);

export { api as apiClient };
