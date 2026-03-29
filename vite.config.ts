import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  envDir: "./environments",
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/service": {
        target: "https://wap.kbzpay.com",
        changeOrigin: true,
        secure: true,
      },
      "/baas": {
        target: "https://wap.kbzpay.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
