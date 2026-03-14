import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PlanCard } from "../plan-card";
import type { PlanItem } from "../../model/types";

function buildPlan(id: string, overrides: Partial<PlanItem> = {}): PlanItem {
  return {
    id,
    dataAmount: "5GB",
    validity: "30 days",
    dataAmountGb: 5,
    validityDays: 30,
    priceLabel: "$15.49",
    unitPrice: "$3.10 per GB",
    sortPrice: 3.1,
    operatorNames: ["AT&T", "Verizon", "T-Mobile USA"],
    bestFor: ["Data only", "Top-up available"],
    ...overrides,
  };
}

describe("PlanCard", () => {
  it("shows popular badge and applies selected state", () => {
    const selectedPlan = buildPlan("plan-a", { highlighted: true, badge: "Most popular" });

    render(<PlanCard isSelected={true} onSelect={vi.fn()} plan={selectedPlan} />);

    expect(screen.getByText("Most popular")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("border-sky-600");
  });

  it("invokes selection handler on click and keyboard activation", async () => {
    const onSelect = vi.fn();
    render(<PlanCard isSelected={false} onSelect={onSelect} plan={buildPlan("plan-b")} />);

    const card = screen.getByRole("button");
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: "Enter", code: "Enter" });
    fireEvent.keyDown(card, { key: " ", code: "Space" });

    expect(onSelect).toHaveBeenCalledTimes(3);
  });
});

