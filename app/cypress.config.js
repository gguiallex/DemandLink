import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://demand-link.vercel.app',
    // nao vai limpar o estado da tela após cada it
    testIsolation: false
  },
});
