import { describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

import { getUnitedStatesPlans } from "../get-store";

describe("getUnitedStatesPlans", () => {
  it("returns fresh cache metadata on every call", async () => {
    const firstCall = await getUnitedStatesPlans();
    const secondCall = await getUnitedStatesPlans();

    const firstCachedPlanText = firstCall.map((plan) => plan.bestFor.find((item) => item.includes("Data cache version")));
    const secondCachedPlanText = secondCall.map((plan) => plan.bestFor.find((item) => item.includes("Data cache version")));

    expect(firstCachedPlanText).toContain("Data cache version: snapshot-1");
    expect(secondCachedPlanText).toContain("Data cache version: snapshot-2");
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
