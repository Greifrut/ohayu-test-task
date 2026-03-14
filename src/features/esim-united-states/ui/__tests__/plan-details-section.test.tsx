import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlanDetailsSection } from "../plan-details-section";
import type { PlanDetailItem } from "../../model/types";

describe("PlanDetailsSection", () => {
  const items: PlanDetailItem[] = [
    {
      id: "operators",
      icon: "operators",
      type: "operators",
      title: "Operators",
      operators: [
        { operator: "AT&T", network: "5G" },
        { operator: "Verizon", network: "5G" },
        { operator: "T-Mobile USA" },
      ],
    },
    {
      id: "activation",
      icon: "activation",
      type: "text",
      title: "Activation",
      text: "Activate within 30 days.",
    },
  ];

  it("renders the section heading and each detail block", () => {
    render(<PlanDetailsSection items={items} />);

    expect(screen.getByText("United States eSIM plan details")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Operators")).toBeInTheDocument();
    expect(screen.getByText("Activation")).toBeInTheDocument();
    expect(screen.getByText("AT&T")).toBeInTheDocument();
    expect(screen.getByText("Activate within 30 days.")).toBeInTheDocument();
  });
});

