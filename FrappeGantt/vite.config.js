import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [
    { src: '~/plugins/litepicker.js', mode: 'client' }
  ],
});
