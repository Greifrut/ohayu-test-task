import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowItWorksSection } from "../how-it-works-section";
import { steps } from "../../model/static-content";

describe("HowItWorksSection", () => {
  it("renders all three process steps", () => {
    render(<HowItWorksSection />);

    expect(screen.getByText("How it works")).toBeInTheDocument();
    expect(screen.getByText("Get connected in three quick steps")).toBeInTheDocument();

    steps.forEach((step) => {
      expect(screen.getByText(step.order.toString())).toBeInTheDocument();
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.subtitle)).toBeInTheDocument();
    });

    expect(screen.getAllByRole("listitem").length).toBe(3);
  });
});

