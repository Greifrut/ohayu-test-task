import { describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

import { getUnitedStatesPlans } from "../get-store";

describe("getUnitedStatesPlans", () => {
  it("returns refreshed pricing on each mocked fetch when cache is not reused", async () => {
    const firstCall = await getUnitedStatesPlans();
    const secondCall = await getUnitedStatesPlans();

    const firstPrices = firstCall.map((plan) => plan.priceLabel);
    const secondPrices = secondCall.map((plan) => plan.priceLabel);

    expect(firstPrices.some((price, index) => price !== secondPrices[index])).toBe(true);
  });

  it("marks the featured plan with popularity metadata", async () => {
    const plans = await getUnitedStatesPlans();
    const featured = plans.find((plan) => plan.badge === "Most popular");
    const otherPlans = plans.filter((plan) => plan.badge !== "Most popular");

    expect(featured).toBeDefined();
    expect(featured?.badge).toBe("Most popular");
    expect(featured?.highlighted).toBe(true);
    expect(otherPlans.every((plan) => plan.badge === undefined)).toBe(true);
  });
});
