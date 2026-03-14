import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const isShowReport = process.argv.includes("show-report");
const shouldStartWebServer =
  process.env.PW_START_WEBSERVER === "1" &&
  process.env.PW_SKIP_WEBSERVER !== "1" &&
  !isShowReport;

export default defineConfig({
  testDir: path.join(__dirname, "e2e"),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  ...(shouldStartWebServer
    ? {
        webServer: {
          command: "pnpm dev --hostname 127.0.0.1 --port 3000",
          url: "http://127.0.0.1:3000",
          reuseExistingServer: !process.env.CI,
          timeout: 120000,
        },
      }
    : {}),
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
