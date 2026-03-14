import { describe, expect, it } from "vitest";
import { toUsdLabel } from "../to-usd-label";

describe("toUsdLabel", () => {
  it("formats integer cents as dollars with 2 decimals", () => {
    expect(toUsdLabel(949)).toBe("$9.49");
    expect(toUsdLabel(0)).toBe("$0.00");
  });

  it("supports large values and keeps two decimal places", () => {
    expect(toUsdLabel(123456)).toBe("$1,234.56");
  });
});
