import { resolve } from "path";

const config = {
  base: "./",
  resolve: {
    alias: {
      $cssAssets: resolve("./assets"),
    },
  },
};

export default config;
