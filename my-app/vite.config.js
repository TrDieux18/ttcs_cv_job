import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 2303,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // alias gốc
      "@actions": path.resolve(__dirname, "./src/actions"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@reducers": path.resolve(__dirname, "./src/reducers"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
});
