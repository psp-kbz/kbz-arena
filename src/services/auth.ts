import { APIRoutes } from "@/config/consts";
import { Envs } from "@/config/envs";
import { authApiClient } from "@/libs/axios/auth-api-client";

export const requestToken = async () => {
  const formData = new URLSearchParams();
  formData.append("client_id", Envs.VITE_CLIENT_ID);
  formData.append("client_secret", Envs.VITE_CLIENT_SECRET);
  formData.append("grant_type", "client_credentials");

  const response = await authApiClient.post(APIRoutes.REQUEST_TOKEN, formData);
  return response.data;
};
