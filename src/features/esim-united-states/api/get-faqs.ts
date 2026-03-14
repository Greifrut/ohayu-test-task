import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { seoFaqs } from "../model/seo-content";
import { randomizeFaqs } from "./fake-live-updates";
import { simulateApiLatency } from "./simulate-latency";

export async function getUnitedStatesFaqs() {
  "use cache";

  cacheLife("seoManaged");
  cacheTag(CACHE_TAGS.faqs);

  await simulateApiLatency(150);

  const faqData = { faqs: randomizeFaqs(seoFaqs) };

  return faqData.faqs;
}
