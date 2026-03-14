import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlanDetailsSectionSlot } from "../../slots/plan-details-section-slot";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

describe("PlanDetailsSectionSlot", () => {
  it("renders US plan detail content from server section", async () => {
    const node = await PlanDetailsSectionSlot();

    render(node);

    expect(screen.getByText("United States eSIM plan details")).toBeInTheDocument();
    expect(screen.getByText("Operators")).toBeInTheDocument();
    expect(screen.getByText("Phone number / SMS")).toBeInTheDocument();
  });
});
