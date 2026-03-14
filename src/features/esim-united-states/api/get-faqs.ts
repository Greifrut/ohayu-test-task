import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { fetchMockJson } from "./fetch-mock";
import type { FaqItem } from "../model/types";

let faqDebugVersion = 0;

function getFaqDebugStamp() {
  faqDebugVersion += 1;
  return {
    version: faqDebugVersion,
    label: `faq-${faqDebugVersion}`,
    generatedAt: new Date().toISOString(),
  };
}

export async function getUnitedStatesFaqs() {
  "use cache";

  cacheLife("seoManaged");
  cacheTag(CACHE_TAGS.faqs);

  const debug = getFaqDebugStamp();

  const faqData = await fetchMockJson<{ faqs: FaqItem[] }>({
    path: "/api/mock/esim/united-states-us/faqs",
  });

  return faqData.faqs.map((faq) => ({
    ...faq,
    answer: `${faq.answer} (cache: ${debug.label})`,
    __debug: debug,
  }));
}
