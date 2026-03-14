import { describe, expect, it } from "vitest";
import { buildBestForText } from "../build-best-for";
import type { StoreBundle } from "../../model/types";

describe("buildBestForText", () => {
  it("builds operator list and top-up availability when operator can top up", () => {
    const bundle: StoreBundle = {
      bundleCodeAndPriceId: "bundle-1",
      dataAmountGb: 10,
      durationDays: 30,
      totalAmountCents: 2499,
      operators: [
        { id: 1, provider: "telco", country: "US", name: "AT&T", speed: "5G" },
        { id: 2, provider: "telco", country: "US", name: "Verizon", speed: "4G" },
        { id: 3, provider: "telco", country: "US", name: "T-Mobile USA", speed: null },
        { id: 4, provider: "telco", country: "US", name: "Extra", speed: "3G" },
      ],
      staticPrices: [{ id: 1, currency: "USD", amountCents: 2499 }],
      isAllowedToAutoTopUp: true,
    };

    const result = buildBestForText(bundle);

    expect(result).toEqual([
      "Operators: AT&T (5G), Verizon (4G), T-Mobile USA",
      "Data only",
      "Top-up available",
    ]);
  });

  it("falls back to unavailable top-up label", () => {
    const bundle: StoreBundle = {
      bundleCodeAndPriceId: "bundle-2",
      dataAmountGb: 3,
      durationDays: 7,
      totalAmountCents: 990,
      operators: [],
      staticPrices: [{ id: 2, currency: "USD", amountCents: 990 }],
      isAllowedToAutoTopUp: false,
    };

    const result = buildBestForText(bundle);

    expect(result).toEqual(["Operators: ", "Data only", "Top-up unavailable"]);
  });
});
