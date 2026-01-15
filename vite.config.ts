import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    server: {
      port: 3000,
      host: "0.0.0.0",
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
        "@services": path.resolve(__dirname, "services"),
        "@components": path.resolve(__dirname, "components"),
      },
    },
  };
});
