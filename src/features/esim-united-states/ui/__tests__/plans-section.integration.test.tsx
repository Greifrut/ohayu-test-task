import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import { PlansSection } from "../plans-section";
import type { PlanItem } from "../../model/types";

function getSamplePlanItem(
  id: string,
  dataAmountGb: number,
  validityDays: number,
  overrides: Partial<PlanItem> = {},
): PlanItem {
  return {
    id,
    dataAmount: `${dataAmountGb}GB`,
    validity: `${validityDays} days`,
    dataAmountGb,
    validityDays,
    priceLabel: "$9.99",
    unitPrice: "$1.00 per GB",
    sortPrice: 1,
    operatorNames: ["AT&T"],
    bestFor: ["Data only"],
    ...overrides,
  };
}

describe("PlansSection", () => {
  const samplePlans = [
    getSamplePlanItem("plan-a", 3, 14),
    getSamplePlanItem("plan-b", 5, 30, {
      highlighted: true,
      badge: "Most popular",
    }),
    getSamplePlanItem("plan-c", 10, 30),
  ];

  it("renders selected plan summary and updates on card selection", async () => {
    render(<PlansSection plans={samplePlans} />);
    const user = userEvent.setup();

    expect(screen.getByText("Chosen plan")).toBeInTheDocument();
    expect(screen.getByText("5GB / 30 days")).toBeInTheDocument();

    const threeGbCard = screen.getByRole("button", { name: /3gb/i });
    await user.click(threeGbCard);
    expect(screen.getByText("3GB / 14 days")).toBeInTheDocument();

    const tenGbCard = screen.getByRole("button", { name: /10gb/i });
    fireEvent.keyDown(tenGbCard, { key: "Enter", code: "Enter" });
    expect(screen.getByText("10GB / 30 days")).toBeInTheDocument();

    const continueButton = screen.getByRole("button", { name: "Continue" });
    expect(continueButton).toBeEnabled();
  });

  it("renders fallback CTA when plans list is empty", () => {
    render(<PlansSection plans={[]} />);

    expect(screen.getByText("Select a plan to continue")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });
});
