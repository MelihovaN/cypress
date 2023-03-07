const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "sif9p6",
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
