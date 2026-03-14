import { describe, expect, it } from "vitest";
import { assignPopularity } from "../assign-popularity";
import type { PlanItem } from "../../model/types";

describe("assignPopularity", () => {
  const planTemplate = (id: string, dataAmountGb: number, validityDays: number): PlanItem => ({
    id,
    dataAmount: `${dataAmountGb}GB`,
    validity: `${validityDays} days`,
    dataAmountGb,
    validityDays,
    priceLabel: "$10.00",
    unitPrice: "$1.00 per GB",
    sortPrice: 1,
    operatorNames: ["AT&T"],
    bestFor: [],
  });

  it("marks 5GB / 30 days plan as most popular when present", () => {
    const input = [
      planTemplate("plan-a", 3, 14),
      planTemplate("plan-b", 5, 30),
      planTemplate("plan-c", 10, 30),
    ];

    const result = assignPopularity(input);
    const popular = result.find((plan) => plan.id === "plan-b");

    expect(popular).toBeDefined();
    expect(popular?.highlighted).toBe(true);
    expect(popular?.badge).toBe("Most popular");
  });

  it("falls back to the second item when no standard featured plan exists", () => {
    const input = [planTemplate("plan-a", 3, 14), planTemplate("plan-b", 10, 30)];

    const result = assignPopularity(input);

    expect(result.at(1)?.highlighted).toBe(true);
    expect(result.at(1)?.badge).toBe("Most popular");
  });
});
