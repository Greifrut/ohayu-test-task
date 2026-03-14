import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

import { setupFeatureMockApiFetch } from "./fetch-mock";

beforeEach(() => {
  setupFeatureMockApiFetch();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

import { getUnitedStatesFaqs } from "../get-faqs";

describe("getUnitedStatesFaqs", () => {
  it("returns a different cache label each call", async () => {
    const first = await getUnitedStatesFaqs();
    const second = await getUnitedStatesFaqs();

    expect(first[0].answer).toContain("cache: faq-1");
    expect(second[0].answer).toContain("cache: faq-2");
    expect(first[0].answer).not.toBe(second[0].answer);
  });
});
