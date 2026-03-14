import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { assignPopularity } from "../util/assign-popularity";
import { mapBundleToPlanItem } from "../util/map-bundle-to-plan";
import { mockUnitedStatesStore } from "../model/provider-content";
import { randomizeStoreResponse } from "./fake-live-updates";
import { simulateApiLatency } from "./simulate-latency";

export async function getUnitedStatesStoreSnapshot() {
  "use cache";

  cacheLife("providerCatalog");
  cacheTag(CACHE_TAGS.providerCatalog);

  await simulateApiLatency(150);

  const mockData = {
    ...mockUnitedStatesStore,
    store: mockUnitedStatesStore.store.map((bundle) => ({
      ...bundle,
      operators: bundle.operators.map((operator) => ({ ...operator })),
      staticPrices: bundle.staticPrices.map((price) => ({ ...price })),
    })),
  };

  return mockData;
}

export async function getUnitedStatesPlans() {
  "use cache";

  cacheLife("providerCatalog");
  cacheTag(CACHE_TAGS.prices);

  await simulateApiLatency(150);

  const { store } = await getUnitedStatesStoreSnapshot();
  const randomizedStore = randomizeStoreResponse({ store });
  const plans = assignPopularity(randomizedStore.store.map((bundle) => mapBundleToPlanItem(bundle)));

  return plans;
}
