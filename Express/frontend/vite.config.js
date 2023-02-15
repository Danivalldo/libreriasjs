import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    proxy: {
      "^(/api)": {
        target: "http://localhost:6006",
        changeOrigin: true,
      },
    },
  },
});
