import { expect, test, type APIRequestContext } from "@playwright/test";

const revalidateSecret = process.env.OHAYU_REVALIDATE_SECRET ?? "demo-secret";

async function callRevalidate(request: APIRequestContext, tag: string) {
  const response = await request.post("/api/revalidate", {
    data: {
      secret: revalidateSecret,
      tag,
    },
  });

  expect(response.ok()).toBeTruthy();
  const payload = (await response.json()) as { ok: boolean; tag: string; revalidatedAt: string };
  expect(payload).toMatchObject({ ok: true, tag });
}

test("revalidate endpoint refreshes cached content and updates content after reload", async ({
  page,
  request,
}) => {
  await page.goto("/");

  const planSectionBefore = (await page.locator("#plans").innerText()).trim();
  const planDetailsSectionBefore = (await page.locator("#plan-details").innerText()).trim();
  const faqSectionBefore = (await page.locator("#faq").innerText()).trim();

  expect(planSectionBefore).toBeTruthy();
  expect(planDetailsSectionBefore).toBeTruthy();
  expect(faqSectionBefore).toBeTruthy();

  await callRevalidate(request, "us-prices");
  await page.reload({ waitUntil: "networkidle" });

  const planSectionAfterPriceRevalidate = (await page.locator("#plans").innerText()).trim();
  const planDetailsSectionAfterPriceRevalidate = (await page.locator("#plan-details").innerText()).trim();
  expect(planSectionAfterPriceRevalidate).not.toBe(planSectionBefore);
  expect(planDetailsSectionAfterPriceRevalidate).toBe(planDetailsSectionBefore);

  await callRevalidate(request, "us-faqs");
  await page.reload({ waitUntil: "networkidle" });

  const faqSectionAfterFaqRevalidate = (await page.locator("#faq").innerText()).trim();
  expect(faqSectionAfterFaqRevalidate).not.toBe(faqSectionBefore);
  expect(planDetailsSectionAfterPriceRevalidate).toBe(planDetailsSectionBefore);

  await callRevalidate(request, "us-plan-details");
  await page.reload({ waitUntil: "networkidle" });

  const planDetailsSectionAfterPlanRevalidate = (await page.locator("#plan-details").innerText()).trim();
  expect(planDetailsSectionAfterPlanRevalidate).not.toBe(planDetailsSectionBefore);
  expect(planDetailsSectionAfterPlanRevalidate).not.toBe(planDetailsSectionAfterPriceRevalidate);
  expect(faqSectionAfterFaqRevalidate).not.toBe(faqSectionBefore);

  const planSectionAfterAll = (await page.locator("#plans").innerText()).trim();
  expect(planSectionAfterAll).toBe(planSectionAfterPriceRevalidate);
});
