import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SkeletonBlock } from "../../fallbacks/skeleton-block";

describe("SkeletonBlock", () => {
  it("renders animated pulse placeholder with provided classes", () => {
    const { container } = render(<SkeletonBlock className="h-10 w-20" />);
    const node = container.firstChild;

    expect(node).toBeInTheDocument();
    expect(node).toHaveClass("animate-pulse", "rounded-2xl", "bg-slate-200/70", "h-10", "w-20");
  });
});
