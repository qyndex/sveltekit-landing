import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Directory that contains the E2E test specs
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",

  // Run tests in parallel across workers
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI to reduce flakiness
  retries: process.env.CI ? 2 : 0,

  // Limit parallelism on CI — avoids resource contention
  workers: process.env.CI ? 1 : undefined,

  // Reporters: list output locally, GitHub annotations on CI
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",

  use: {
    // Base URL for the dev server — Vite default
    baseURL: "http://localhost:5173",

    // Attach traces for failing tests
    trace: "on-first-retry",

    // Capture screenshot on failure
    screenshot: "only-on-failure",

    // Prefer English locale for consistent text matching
    locale: "en-US",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // Mobile viewport smoke test
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  // Automatically start the Vite dev server before running tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
    timeout: 60_000,
  },
});
