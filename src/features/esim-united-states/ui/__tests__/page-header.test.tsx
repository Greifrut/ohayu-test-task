import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EsimPageHeader } from "../page-header";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("EsimPageHeader", () => {
  it("renders brand, navigation, and utility links", () => {
    render(<EsimPageHeader />);

    expect(screen.getByText("Ohayu")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Plans" })).toHaveAttribute("href", "#plans");
    expect(screen.getByRole("link", { name: "Plan details" })).toHaveAttribute(
      "href",
      "#plan-details",
    );
    expect(screen.getByRole("button", { name: "USD" })).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });
});
