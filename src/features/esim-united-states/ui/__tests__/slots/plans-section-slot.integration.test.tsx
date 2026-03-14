import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlansSectionSlot } from "../../slots/plans-section-slot";
import { setupFeatureMockApiFetch } from "../../../api/__tests__/fetch-mock";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

beforeEach(() => {
  setupFeatureMockApiFetch();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

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
