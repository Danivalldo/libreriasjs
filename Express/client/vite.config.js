import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "./dist/",
  },
  server: {
    proxy: {
      "^(/api|/login|/register)": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
