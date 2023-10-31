import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT),
    proxy: {
      "^(/api|/signin|/signup|/test)": {
        target: `http://localhost:${process.env.API_PORT}`,
        changeOrigin: true,
      },
    },
  },
});
