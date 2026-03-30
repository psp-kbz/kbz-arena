import { requestToken } from "@/services/auth";
import { loginWithAuthCode } from "@/services/splash-auth";
import { GetAuthCode } from "@/utils/native-apis";

export const getAuthCodeAsync = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    GetAuthCode(
      (code) => resolve(code),
      (err) => reject(err),
    );
  });
};

export const requestTokenAsync = async () => {
  return requestToken();
};

export const splashLoginAsync = async (authCode: string) => {
  return loginWithAuthCode(authCode);
};
