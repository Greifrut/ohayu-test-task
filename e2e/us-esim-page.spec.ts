import { expect, test } from "@playwright/test";

test.describe("Ohayu pages", () => {
  test("renders a dedicated home page and links to the country demo", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "SSR-ready storefront demo for the Ohayu migration",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("banner").getByRole("link", { name: "Open United States demo page" }),
    ).toHaveAttribute("href", "/esim/united-states-us");
  });

  test("renders hero, plans and details with cache-driven content", async ({ page }) => {
    await page.goto("/esim/united-states-us");

    await expect(page.getByText("United States eSIM plans")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Data plans designed for US travel and everyday city navigation",
      }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "eSIM USA plans" })).toBeVisible();
    await expect(page.getByRole("button").filter({ hasText: "3GB" }).first()).toBeVisible();
    await expect(page.getByRole("button").filter({ hasText: "Most popular" }).first()).toBeVisible();
    await expect(
      page
        .locator("#faq")
        .getByRole("heading", { name: "Frequently asked questions" }),
    ).toBeVisible();
  });

  test("updates chosen-plan footer when selecting another plan", async ({ page }) => {
    await page.goto("/esim/united-states-us");

    const mostPopular = page
      .locator("section#plans")
      .locator('[role="button"]', { hasText: "Most popular" })
      .first();
    await expect(mostPopular).toBeVisible();
    await expect(page.getByText("Chosen plan").first()).toBeVisible();
    await expect(page.getByText("5GB / 30 days")).toBeVisible();

    const tenGbCard = page
      .locator("section#plans")
      .locator('[role="button"]', { hasText: "10GB" })
      .first();
    await tenGbCard.click();

    await expect(page.getByText("10GB / 30 days")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  test("opens and collapses FAQ items", async ({ page }) => {
    await page.goto("/esim/united-states-us#faq");

    const faqSection = page.locator("#faq");
    const firstQuestion = faqSection.getByText("Can I use this eSIM on iPhone and Android?");

    await expect(firstQuestion).toBeVisible();
    await firstQuestion.click();
    await expect(
      faqSection.getByText(
        "Yes, any phone unlocked and eSIM compatible with iOS 16+ or Android 10+ can typically use this profile.",
      ),
    ).toBeVisible();
  });
});
