import { APIRoutes } from "@/config/consts";
import { Envs } from "@/config/envs";
import { authApiClient } from "@/libs/axios/auth-api-client";

type TokenResponse = {
  access_token: string;
  expires_in?: number;
};

export const requestToken = async (): Promise<TokenResponse> => {
  const response = await authApiClient.post<TokenResponse>(
    APIRoutes.REQUEST_TOKEN,
    {
      client_id: Envs.VITE_CLIENT_ID,
      client_secret: Envs.VITE_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  );

  return response.data;
};
