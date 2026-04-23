import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ hot: false })],
  test: {
    // Use jsdom for DOM simulation in unit tests
    environment: "jsdom",
    // Glob for unit test files (avoids picking up playwright e2e specs)
    include: ["src/**/*.{test,spec}.{js,ts}"],
    exclude: ["e2e/**", "node_modules/**"],
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // Ensure Svelte resolves to the client (browser) bundle, not server.
    // Mock SvelteKit-specific modules that aren't available in unit tests.
    alias: [
      { find: /^svelte$/, replacement: "svelte" },
      { find: "$app/forms", replacement: new URL("./src/test/mocks/app-forms.ts", import.meta.url).pathname },
      { find: "$app/stores", replacement: new URL("./src/test/mocks/app-stores.ts", import.meta.url).pathname },
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/lib/**/*.{svelte,ts}"],
      exclude: ["src/test/**"],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    conditions: ["browser"],
  },
});
