import { Envs } from "@/config/envs";
import { requestToken } from "@/services/auth";
import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

type RetryableRequestConfig = {
  _retry?: boolean;
  headers?: Record<string, string>;
};

export const coreApiClient = axios.create({
  baseURL: Envs.VITE_API_URL,
});

coreApiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  config.headers["Content-Type"] = "application/json";

  if (accessToken) {
    config.headers["access-token"] = accessToken;
    if ("Authorization" in config.headers) {
      delete config.headers.Authorization;
    }
  }

  return config;
});

coreApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const data = await requestToken();
        useAuthStore.getState().setAccessToken(data.access_token);
        originalRequest.headers = {
          ...(originalRequest.headers ?? {}),
          "access-token": data.access_token,
        };
        delete originalRequest.headers.Authorization;
        return coreApiClient(originalRequest);
      } catch (tokenError) {
        useAuthStore.getState().setAccessToken(null);
        return Promise.reject(tokenError);
      }
    }

    return Promise.reject(error);
  },
);
