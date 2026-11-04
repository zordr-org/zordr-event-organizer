import { defineConfig } from "@playwright/test";

const externalServer = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  use: {
    baseURL: externalServer ?? "http://localhost:3101",
    viewport: { width: 1348, height: 926 },
    headless: true,
    channel: "chrome",
    screenshot: "only-on-failure",
  },
  webServer: externalServer ? undefined : {
    command: "npm run dev -- --webpack --port 3101",
    url: "http://localhost:3101",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
