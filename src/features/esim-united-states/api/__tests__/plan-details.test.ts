import { describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

import { CACHE_TAGS } from "../../constant/cache-tags";
import { getUnitedStatesPlanDetails } from "../plan-details";
import { bumpVersionForTag, resetContentVersions } from "../content-version-store";
import { providerPlanDetailItems } from "../../model/provider-content";

describe("getUnitedStatesPlanDetails", () => {
  it("refreshes plan detail text and keeps operator data current", async () => {
    await resetContentVersions();

    const first = await getUnitedStatesPlanDetails();
    await bumpVersionForTag(CACHE_TAGS.planDetails);
    const second = await getUnitedStatesPlanDetails();

    const firstText = first.find((item) => item.type === "text");
    const secondText = second.find((item) => item.type === "text");
    const operators = first.find((item) => item.type === "operators")?.operators ?? [];
    const baselineTextItem = providerPlanDetailItems.find((item) => item.type === "text");

    expect(firstText?.text).not.toBeUndefined();
    expect(secondText?.text).not.toBeUndefined();
    expect(firstText?.text).not.toBe(baselineTextItem?.text);
    expect(secondText?.text).not.toBe(baselineTextItem?.text);
    expect(firstText?.text).not.toBe(secondText?.text);
    expect(operators).toEqual([
      { operator: "AT&T", network: "5G" },
      { operator: "Verizon", network: "5G" },
      { operator: "T-Mobile USA", network: undefined },
    ]);
  });
});
