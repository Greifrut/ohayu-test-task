import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { seoFaqs } from "../model/seo-content";
import { simulateApiLatency } from "./simulate-latency";

let faqDebugVersion = 0;

function getFaqDebugStamp() {
  faqDebugVersion += 1;
  return {
    label: `faq-${faqDebugVersion}`,
  };
}

export async function getUnitedStatesFaqs() {
  "use cache";

  cacheLife("seoManaged");
  cacheTag(CACHE_TAGS.faqs);

  await simulateApiLatency(150);

  const debug = getFaqDebugStamp();

  const faqData = { faqs: seoFaqs };

  return faqData.faqs.map((faq) => ({
    ...faq,
    answer: `${faq.answer} (cache: ${debug.label})`,
    __debug: debug,
  }));
}
