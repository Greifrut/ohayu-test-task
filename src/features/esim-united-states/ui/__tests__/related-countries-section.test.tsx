import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RelatedCountriesSection } from "../related-countries-section";
import { relatedCountries } from "../../model/static-content";

describe("RelatedCountriesSection", () => {
  it("renders all related country links", () => {
    render(<RelatedCountriesSection />);

    expect(screen.getByText("Explore more destination eSIMs")).toBeInTheDocument();
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(relatedCountries.length);
    relatedCountries.forEach((country) => {
      const link = screen.getByRole("link", { name: country });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "#");
    });
  });
});
