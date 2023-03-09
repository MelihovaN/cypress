const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "sif9p6",
  env: {
    email: "melihova.qa@gmail.com",
    password: "Test1234",
  },
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

// npx cypress run --config baseUrl="https://santa-secret.ru/"
