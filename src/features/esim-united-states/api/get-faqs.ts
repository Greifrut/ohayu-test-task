import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { seoFaqs } from "../model/seo-content";

export async function getUnitedStatesFaqs() {
  "use cache";

  cacheLife("seoManaged");
  cacheTag(CACHE_TAGS.faqs);

  return seoFaqs;
}
