import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

import { setupFeatureMockApiFetch } from "./fetch-mock";

beforeEach(() => {
  setupFeatureMockApiFetch();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

import { getUnitedStatesPlanDetails } from "../plan-details";

describe("getUnitedStatesPlanDetails", () => {
  it("adds cache marker to text items and keeps operator data current", async () => {
    const first = await getUnitedStatesPlanDetails();
    const second = await getUnitedStatesPlanDetails();

    const firstText = first.find((item) => item.type === "text");
    const secondText = second.find((item) => item.type === "text");
    const operators = first.find((item) => item.type === "operators")?.operators ?? [];

    expect(firstText?.text).toContain("(snapshot-1)");
    expect(secondText?.text).toContain("(snapshot-2)");
    expect(firstText?.text).not.toBe(secondText?.text);
    expect(operators).toEqual([
      { operator: "AT&T", network: "5G" },
      { operator: "Verizon", network: "5G" },
      { operator: "T-Mobile USA", network: undefined },
    ]);
  });
});
