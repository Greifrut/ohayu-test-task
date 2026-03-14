import { expect, test, type APIRequestContext } from "@playwright/test";

const revalidateSecret = process.env.OHAYU_REVALIDATE_SECRET ?? "demo-secret";

function parseCacheIndex(text: string | null, label: string): number {
  if (!text) {
    return -1;
  }

  const match = text.match(new RegExp(`${label}-(\\d+)`));
  return match ? Number.parseInt(match[1], 10) : -1;
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
  await page.goto("/");

  const planCache = page.locator("#plans").getByText(/Data cache version: snapshot-\d+/).first();
  await expect(planCache).toBeVisible();
  const beforePlanCacheLabel = parseCacheIndex(await planCache.textContent(), "snapshot");

  const faqCache = page.locator("#faq").getByText(/\(cache: faq-\d+\)/).first();
  await expect(faqCache).toBeAttached();
  const beforeFaqCacheLabel = parseCacheIndex(await faqCache.textContent(), "faq");

  expect(beforePlanCacheLabel).toBeGreaterThan(0);
  expect(beforeFaqCacheLabel).toBeGreaterThan(0);

  await callRevalidate(request, "us-prices");
  await page.reload({ waitUntil: "networkidle" });

  const planCacheAfterReload = page
    .locator("#plans")
    .getByText(/Data cache version: snapshot-\d+/)
    .first();
  await expect(planCacheAfterReload).toBeVisible();
  const afterPlanCacheLabel = parseCacheIndex(await planCacheAfterReload.textContent(), "snapshot");
  expect(afterPlanCacheLabel).toBeGreaterThan(beforePlanCacheLabel);

  await callRevalidate(request, "us-faqs");
  await page.reload({ waitUntil: "networkidle" });

  const faqCacheAfterReload = page.locator("#faq").getByText(/\(cache: faq-\d+\)/).first();
  await expect(faqCacheAfterReload).toBeAttached();
  const afterFaqCacheLabel = parseCacheIndex(await faqCacheAfterReload.textContent(), "faq");
  expect(afterFaqCacheLabel).toBeGreaterThan(beforeFaqCacheLabel);
});
