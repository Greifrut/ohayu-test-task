import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlansSectionFallback } from "../../fallbacks/plans-section-fallback";

describe("PlansSectionFallback", () => {
  it("renders plan section title and placeholder cards", () => {
    render(<PlansSectionFallback />);

    expect(screen.getByText("eSIM USA plans")).toBeInTheDocument();

    const skeletonLines = document.querySelectorAll(".animate-pulse.rounded-2xl.bg-slate-200\\/70");
    expect(skeletonLines.length).toBeGreaterThan(0);
  });
});
