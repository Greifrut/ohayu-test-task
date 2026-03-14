import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DetailsSection } from "../details-section";
import { benefits, planFeatures } from "../../model/static-content";

describe("DetailsSection", () => {
  it("renders all feature groups and inclusion list", () => {
    render(<DetailsSection />);

    expect(screen.getByText("Coverage facts")).toBeInTheDocument();
    expect(screen.getByText("Why choose this eSIM for the United States")).toBeInTheDocument();

    planFeatures.forEach((item) => {
      expect(screen.getByText(item.heading)).toBeInTheDocument();
      if (Array.isArray(item.value)) {
        item.value.forEach((entry) => {
          expect(screen.getByText((content) => content.includes(entry))).toBeInTheDocument();
        });
      } else {
        expect(screen.getByText(item.value)).toBeInTheDocument();
      }
    });

    expect(screen.getByText("What we include")).toBeInTheDocument();
    benefits.forEach((benefit) => {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    });
  });
});
