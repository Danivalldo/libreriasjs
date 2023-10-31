import { defineConfig } from "cypress";
import { seed } from "./backend/test-utils/testSeed.js";

export default defineConfig({
  e2e: {
    supportFile: "cypress/e2e/support/e2e.{js,jsx,ts,tsx}",
    baseUrl: `http://localhost:${process.env.PORT}`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async seedDatabase() {
          await seed();
          return null;
        },
      });
    },
  },
});
