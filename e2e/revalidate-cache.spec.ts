import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

const revalidateSecret = process.env.OHAYU_REVALIDATE_SECRET ?? "playwright-secret";

async function getVisibleSectionText(page: Page, sectionId: string): Promise<string> {
  const section = page
    .locator("main")
    .locator(`#${sectionId}`)
    .filter({ hasNot: page.locator(".animate-pulse") })
    .first();

  await expect(section).toBeVisible();
  return (await section.innerText()).trim();
}

async function getVisibleFaqAnswers(page: Page): Promise<string> {
  const section = page
    .locator("main")
    .locator("#faq")
    .filter({ hasNot: page.locator(".animate-pulse") })
    .first();

  await expect(section).toBeVisible();

  const answerNodes = section.locator("details p");
  const answerTexts = await answerNodes.allTextContents();

  return answerTexts.join("\n").trim();
}

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
  await page.goto("/esim/united-states-us");

  const planSectionBefore = await getVisibleSectionText(page, "plans");
  const planDetailsSectionBefore = await getVisibleSectionText(page, "plan-details");
  const faqSectionBefore = await getVisibleSectionText(page, "faq");

  expect(planSectionBefore).toBeTruthy();
  expect(planDetailsSectionBefore).toBeTruthy();
  expect(faqSectionBefore).toBeTruthy();

  await callRevalidate(request, "us-prices");
  await page.reload({ waitUntil: "networkidle" });

  const planSectionAfterPriceRevalidate = await getVisibleSectionText(page, "plans");
  const planDetailsSectionAfterPriceRevalidate = await getVisibleSectionText(page, "plan-details");
  expect(planSectionAfterPriceRevalidate).not.toBe(planSectionBefore);
  expect(planDetailsSectionAfterPriceRevalidate).toBe(planDetailsSectionBefore);

  const faqAnswersBefore = await getVisibleFaqAnswers(page);

  await callRevalidate(request, "us-faqs");
  await page.reload({ waitUntil: "networkidle" });

  const faqSectionAfterFaqRevalidate = await getVisibleSectionText(page, "faq");
  const faqAnswersAfterFaqRevalidate = await getVisibleFaqAnswers(page);
  expect(faqSectionAfterFaqRevalidate).toBeTruthy();
  expect(faqAnswersAfterFaqRevalidate).not.toBe(faqAnswersBefore);
  expect(planDetailsSectionAfterPriceRevalidate).toBe(planDetailsSectionBefore);

  await callRevalidate(request, "us-plan-details");
  await page.reload({ waitUntil: "networkidle" });

  const planDetailsSectionAfterPlanRevalidate = await getVisibleSectionText(page, "plan-details");
  expect(planDetailsSectionAfterPlanRevalidate).not.toBe(planDetailsSectionBefore);
  expect(planDetailsSectionAfterPlanRevalidate).not.toBe(planDetailsSectionAfterPriceRevalidate);
  expect(await getVisibleFaqAnswers(page)).toBe(faqAnswersAfterFaqRevalidate);

  const planSectionAfterAll = await getVisibleSectionText(page, "plans");
  expect(planSectionAfterAll).toBe(planSectionAfterPriceRevalidate);
});
