import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PlanDetailItem } from "../plan-details-section/plan-detail-item";
import { PlanDetailContent } from "../plan-details-section/plan-detail-content";
import { PlanDetailIcon } from "../plan-details-section/plan-detail-icon";
import { PlanDetailOperators } from "../plan-details-section/plan-detail-operators";
import type { PlanDetailItem as PlanDetailItemType } from "../../model/types";

describe("Plan detail components", () => {
  it("renders operator chips with and without speeds", () => {
    const operators = [
      { operator: "AT&T", network: "5G" },
      { operator: "T-Mobile USA" },
    ];

    const { container } = render(<PlanDetailOperators operators={operators} />);

    expect(container.querySelectorAll("span").length).toBeGreaterThan(0);
    expect(container).toHaveTextContent("AT&T");
    expect(container).toHaveTextContent("· 5G");
    expect(container).toHaveTextContent("T-Mobile USA");
  });

  it("renders text content for text plan details", () => {
    const item: PlanDetailItemType = {
      id: "text",
      icon: "sms",
      type: "text",
      title: "Phone number / SMS",
      text: "No, eSIM is data only",
    };

    const result = render(<PlanDetailContent item={item} />);

    expect(result.getByText("Phone number / SMS")).toBeInTheDocument();
    expect(result.getByText("No, eSIM is data only")).toBeInTheDocument();
  });

  it("renders operator item content via PlanDetailContent", () => {
    const item: PlanDetailItemType = {
      id: "operators",
      icon: "operators",
      type: "operators",
      title: "Operators",
      operators: [{ operator: "AT&T", network: "5G" }],
    };

    const result = render(<PlanDetailContent item={item} />);

    expect(result.getByText("Operators")).toBeInTheDocument();
    expect(result.getByText("AT&T")).toBeInTheDocument();
    expect(result.getByText("· 5G")).toBeInTheDocument();
  });

  it("renders all plan detail icon variants without crashing", () => {
    const icons = ["operators", "sms", "activation", "reinstall", "topup", "hotspot"] as const;

    icons.forEach((icon) => {
      const { container, unmount } = render(<PlanDetailIcon icon={icon} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      unmount();
    });
  });

  it("combines icon and content in a plan detail item", () => {
    const item: PlanDetailItemType = {
      id: "text-item",
      icon: "topup",
      type: "text",
      title: "Data top-up",
      text: "Yes, available",
    };

    const result = render(<PlanDetailItem item={item as PlanDetailItemType} />);

    expect(result.getByText("Data top-up")).toBeInTheDocument();
    expect(result.getByText("Yes, available")).toBeInTheDocument();
  });
});

