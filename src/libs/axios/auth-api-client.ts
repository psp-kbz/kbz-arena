import { Envs } from "@/config/envs";
import axios from "axios";

export const authApiClient = axios.create({
  baseURL: Envs.VITE_AUTH_URL,
});
