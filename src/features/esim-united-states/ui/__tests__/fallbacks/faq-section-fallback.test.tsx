import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqSectionFallback } from "../../fallbacks/faq-section-fallback";

describe("FaqSectionFallback", () => {
  it("renders faq fallback state", () => {
    render(<FaqSectionFallback />);

    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();
    expect(screen.getByText("Clear answers before checkout")).toBeInTheDocument();

    const skeletonBlocks = document.querySelectorAll(".animate-pulse");
    expect(skeletonBlocks.length).toBeGreaterThan(0);
  });
});
