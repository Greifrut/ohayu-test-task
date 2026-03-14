import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqSectionSlot } from "../../slots/faq-section-slot";
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

describe("FaqSectionSlot", () => {
  it("loads FAQs from API and renders fallback-free section", async () => {
    const node = await FaqSectionSlot();

    render(node);

    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();
    expect(screen.getByText("Can I use this eSIM on iPhone and Android?")).toBeInTheDocument();
  });
});
