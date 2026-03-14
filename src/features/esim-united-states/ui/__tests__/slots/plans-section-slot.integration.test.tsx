import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { PlansSectionSlot } from "../../slots/plans-section-slot";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

describe("PlansSectionSlot", () => {
  it("renders plans section with real API data", async () => {
    const node = await PlansSectionSlot();

    render(node);

    expect(screen.getByText("eSIM USA plans")).toBeInTheDocument();
    expect(screen.getByText("3GB")).toBeInTheDocument();
    expect(screen.getByText("5GB")).toBeInTheDocument();
    expect(screen.getByText("Chosen plan")).toBeInTheDocument();
  });
});
