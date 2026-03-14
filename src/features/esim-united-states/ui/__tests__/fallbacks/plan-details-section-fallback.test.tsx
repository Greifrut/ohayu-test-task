import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlanDetailsSectionFallback } from "../../fallbacks/plan-details-section-fallback";

describe("PlanDetailsSectionFallback", () => {
  it("renders section title and loading placeholder content", () => {
    render(<PlanDetailsSectionFallback />);

    expect(screen.getByText("United States eSIM plan details")).toBeInTheDocument();
    expect(screen.getByText("Important usage and technical details before you pick your plan.")).toBeInTheDocument();

    const skeletonLines = document.querySelectorAll(".animate-pulse");
    expect(skeletonLines.length).toBeGreaterThan(10);
  });
});
