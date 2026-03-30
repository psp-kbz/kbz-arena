export const ENCRYPT_KEY = import.meta.env.VITE_ENCRYPT_KEY ?? "Default";

export const APIRoutes = {
  REQUEST_TOKEN: "/oauth2/token",
  AUTO_LOGIN: "/auto_login",
  SUBMIT_PAYMENT: "/pay",
};
