import { APIRoutes } from "@/config/consts";
import { coreApiClient } from "@/libs/axios/core-api-client";
import type { User } from "@/types/user";

export const loginWithAuthCode = async (authCode: string) => {
  const response = await coreApiClient.post<APIDataResponse<User>>(
    APIRoutes.AUTO_LOGIN,
    {
      authCode,
    },
  );

  return response.data;
};
