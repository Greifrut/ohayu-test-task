import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { seoFaqs } from "../model/seo-content";

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

  return seoFaqs.map((faq) => ({
    ...faq,
    answer: `${faq.answer} (cache: ${debug.label})`,
    __debug: debug,
  }));
}
