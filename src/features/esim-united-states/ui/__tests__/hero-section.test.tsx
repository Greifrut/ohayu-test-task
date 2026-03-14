import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../hero-section";

describe("HeroSection", () => {
  it("renders hero copy and callouts", () => {
    render(<HeroSection />);

    expect(screen.getByText("United States eSIM plans")).toBeInTheDocument();
    expect(screen.getByText("Data plans designed for US travel and everyday city navigation")).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes("Buy local US eSIM coverage with transparent pricing, fast activation"),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("eSIM + QR Delivery")).toBeInTheDocument();
  });
});
