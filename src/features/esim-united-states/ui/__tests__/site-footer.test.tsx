import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "../site-footer";
import { copyrightYear } from "../../model/static-content";

describe("SiteFooter", () => {
  it("renders legal and resource links with current year", () => {
    render(<SiteFooter />);

    expect(screen.getByText("Ohayu")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();

    const resources = ["Activation Guide", "eSIM Compatibility", "Support"];
    const legal = ["Terms", "Privacy", "Refund Policy"];

    resources.forEach((label) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", "#");
    });
    legal.forEach((label) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", "#");
    });

    expect(screen.getByText((content) => content.includes(`${copyrightYear}`))).toBeInTheDocument();
  });
});
