import { describe, expect, it } from "vitest";
import { mapBundleToPlanItem } from "../map-bundle-to-plan";
import type { StoreBundle } from "../../model/types";

describe("mapBundleToPlanItem", () => {
  it("maps a bundle to UI plan format with USD pricing", () => {
    const bundle: StoreBundle = {
      bundleCodeAndPriceId: "sample-plan",
      dataAmountGb: 10,
      durationDays: 30,
      totalAmountCents: 9999,
      operators: [
        {
          id: 1,
          provider: "telco_vision",
          country: "US",
          name: "AT&T",
          speed: "5G",
        },
        {
          id: 2,
          provider: "telco_vision",
          country: "US",
          name: "Verizon",
          speed: "5G",
        },
      ],
      staticPrices: [
        { id: 1, currency: "USD", amountCents: 2450 },
        { id: 2, currency: "EUR", amountCents: 2240 },
      ],
      isAllowedToAutoTopUp: true,
    };

    const planItem = mapBundleToPlanItem(bundle);

    expect(planItem).toMatchObject({
      id: "sample-plan",
      dataAmount: "10GB",
      validity: "30 days",
      dataAmountGb: 10,
      validityDays: 30,
      priceLabel: "$24.50",
      unitPrice: "$2.45 per GB",
      sortPrice: 2.45,
      operatorNames: ["AT&T", "Verizon"],
      bestFor: [
        "Operators: AT&T (5G), Verizon (5G)",
        "Data only",
        "Top-up available",
      ],
    });
  });

  it("falls back to total amount when USD price is absent", () => {
    const bundle: StoreBundle = {
      bundleCodeAndPriceId: "fallback-plan",
      dataAmountGb: 4,
      durationDays: 7,
      totalAmountCents: 1999,
      operators: [
        {
          id: 3,
          provider: "telco_vision",
          country: "US",
          name: "T-Mobile USA",
          speed: null,
        },
      ],
      staticPrices: [{ id: 1, currency: "EUR", amountCents: 2200 }],
      isAllowedToAutoTopUp: false,
    };

    const planItem = mapBundleToPlanItem(bundle);

    expect(planItem.priceLabel).toBe("$19.99");
    expect(planItem.bestFor.at(2)).toBe("Top-up unavailable");
  });
});
