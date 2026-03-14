import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { mockUnitedStatesStore } from "../model/provider-content";
import { assignPopularity } from "../util/assign-popularity";
import { mapBundleToPlanItem } from "../util/map-bundle-to-plan";

export async function getUnitedStatesStoreSnapshot() {
  "use cache";

  cacheLife("providerCatalog");
  cacheTag(
    CACHE_TAGS.providerCatalog,
    CACHE_TAGS.prices,
    CACHE_TAGS.planDetails,
  );

  return mockUnitedStatesStore;
}

export async function getUnitedStatesPlans() {
  const { store } = await getUnitedStatesStoreSnapshot();
  return assignPopularity(store.map((bundle) => mapBundleToPlanItem(bundle)));
}
