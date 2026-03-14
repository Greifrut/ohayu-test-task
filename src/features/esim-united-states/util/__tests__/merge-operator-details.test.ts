import { describe, expect, it } from "vitest";
import { mergeOperatorDetailsFromStore } from "../merge-operator-details";
import type { StoreBundle } from "../../model/types";

describe("mergeOperatorDetailsFromStore", () => {
  it("deduplicates operator details and keeps first-seen order", () => {
    const stores: StoreBundle[] = [
      {
        bundleCodeAndPriceId: "bundle-a",
        dataAmountGb: 1,
        durationDays: 7,
        totalAmountCents: 1000,
        operators: [
          { id: 1, provider: "telco", country: "US", name: "AT&T", speed: "5G" },
          { id: 2, provider: "telco", country: "US", name: "Verizon", speed: "5G" },
        ],
        staticPrices: [{ id: 1, currency: "USD", amountCents: 1000 }],
        isAllowedToAutoTopUp: true,
      },
      {
        bundleCodeAndPriceId: "bundle-b",
        dataAmountGb: 2,
        durationDays: 14,
        totalAmountCents: 1200,
        operators: [
          { id: 3, provider: "telco", country: "US", name: "AT&T", speed: "4G" },
          { id: 4, provider: "telco", country: "US", name: "T-Mobile USA", speed: null },
        ],
        staticPrices: [{ id: 2, currency: "USD", amountCents: 1200 }],
        isAllowedToAutoTopUp: true,
      },
    ];

    const merged = mergeOperatorDetailsFromStore(stores);

    expect(merged).toEqual([
      { operator: "AT&T", network: "5G" },
      { operator: "Verizon", network: "5G" },
      { operator: "T-Mobile USA", network: undefined },
    ]);
  });
});
