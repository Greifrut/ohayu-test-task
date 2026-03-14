import { describe, expect, it } from "vitest";
import { mapOperatorSummaries } from "../map-operator-summaries";
import type { StoreBundle } from "../../model/types";

describe("mapOperatorSummaries", () => {
  it("deduplicates operators preserving first seen speed per operator name", () => {
    const bundle: StoreBundle = {
      bundleCodeAndPriceId: "bundle",
      dataAmountGb: 5,
      durationDays: 14,
      totalAmountCents: 1200,
      operators: [
        { id: 1, provider: "telco", country: "US", name: "AT&T", speed: "5G" },
        { id: 2, provider: "telco", country: "US", name: "AT&T", speed: "4G" },
        { id: 3, provider: "telco", country: "US", name: "Verizon", speed: "5G" },
        { id: 4, provider: "telco", country: "US", name: "verizon", speed: null },
      ],
      staticPrices: [{ id: 1, currency: "USD", amountCents: 1200 }],
      isAllowedToAutoTopUp: true,
    };

    const result = mapOperatorSummaries(bundle);

    expect(result).toEqual([
      { operator: "AT&T", network: "5G" },
      { operator: "Verizon", network: "5G" },
    ]);
  });
});
