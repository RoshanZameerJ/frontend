const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}", // Update the path to your spec files
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
