import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "./../dist/",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
