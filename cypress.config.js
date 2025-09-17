import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Import plugins index file
      // eslint-disable-next-line global-require
      return import("./cypress/plugins/index.js").then((module) => {
        return module.default(on, config);
      });
    },
    baseUrl: "http://localhost:6006/",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx}",
    supportFile: "cypress/support/e2e.js",
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    downloadsFolder: "cypress/downloads",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
