import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

// Vite build configuration only.
// Test configuration lives in vitest.config.ts.
export default defineConfig({
  plugins: [sveltekit()],
});
