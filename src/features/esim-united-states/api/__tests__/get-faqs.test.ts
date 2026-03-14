import { describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

import { CACHE_TAGS } from "../../constant/cache-tags";
import { bumpVersionForTag, resetContentVersions } from "../content-version-store";
import { getUnitedStatesFaqs } from "../get-faqs";
import { seoFaqs } from "../../model/seo-content";

describe("getUnitedStatesFaqs", () => {
  it("adds refreshed content to FAQ answers", async () => {
    await resetContentVersions();

    const first = await getUnitedStatesFaqs();
    await bumpVersionForTag(CACHE_TAGS.faqs);
    const second = await getUnitedStatesFaqs();

    expect(first[0].answer).not.toBe(seoFaqs[0].answer);
    expect(second[0].answer).not.toBe(seoFaqs[0].answer);
    expect(first[0].answer).not.toBe(second[0].answer);
    expect(first[1].answer).not.toBe(second[1].answer);
  });
});
