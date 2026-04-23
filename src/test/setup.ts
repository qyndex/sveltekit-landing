// Global test setup for vitest + jsdom
// Runs before every test file in the suite.

// Add jest-dom matchers (toBeInTheDocument, toHaveAttribute, etc.)
import "@testing-library/jest-dom/vitest";

// Make @testing-library/svelte cleanup automatic after each test.
import "@testing-library/svelte/vitest";

// Polyfill matchMedia — jsdom does not implement it, but some Svelte
// transitions query it. Keep it as a no-op stub.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
