import { describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

import { CACHE_TAGS } from "../../constant/cache-tags";
import { bumpVersionForTag, resetContentVersions } from "../content-version-store";
import { getUnitedStatesPlans } from "../get-store";

describe("getUnitedStatesPlans", () => {
  it("updates plan pricing after a prices revalidation event", async () => {
    await resetContentVersions();

    const firstCall = await getUnitedStatesPlans();
    await bumpVersionForTag(CACHE_TAGS.prices);
    const secondCall = await getUnitedStatesPlans();

    const firstPrices = firstCall.map((plan) => plan.priceLabel);
    const secondPrices = secondCall.map((plan) => plan.priceLabel);

    expect(firstPrices.some((price, index) => price !== secondPrices[index])).toBe(true);
  });

  it("marks the featured plan with popularity metadata", async () => {
    await resetContentVersions();

    const plans = await getUnitedStatesPlans();
    const featured = plans.find((plan) => plan.badge === "Most popular");
    const otherPlans = plans.filter((plan) => plan.badge !== "Most popular");

    expect(featured).toBeDefined();
    expect(featured?.badge).toBe("Most popular");
    expect(featured?.highlighted).toBe(true);
    expect(otherPlans.every((plan) => plan.badge === undefined)).toBe(true);
  });
});
