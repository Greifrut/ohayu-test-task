import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const isShowReport = process.argv.includes("show-report");
const revalidateSecret = process.env.OHAYU_REVALIDATE_SECRET ?? "playwright-secret";
const shouldStartWebServer =
  process.env.PW_START_WEBSERVER === "1" &&
  process.env.PW_SKIP_WEBSERVER !== "1" &&
  !isShowReport;
const webServerCommand =
  process.env.PW_USE_PROD_SERVER === "1"
    ? "pnpm start --hostname 127.0.0.1 --port 3000"
    : "pnpm dev --hostname 127.0.0.1 --port 3000";

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
          command: `OHAYU_REVALIDATE_SECRET=${revalidateSecret} ${webServerCommand}`,
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
