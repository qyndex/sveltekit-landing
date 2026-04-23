import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    // Use jsdom for DOM simulation in unit tests
    environment: "jsdom",
    // Glob for unit test files (avoids picking up playwright e2e specs)
    include: ["src/**/*.{test,spec}.{js,ts}"],
    exclude: ["e2e/**", "node_modules/**"],
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
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
});
