import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { assignPopularity } from "../util/assign-popularity";
import { mapBundleToPlanItem } from "../util/map-bundle-to-plan";
import { mockUnitedStatesStore } from "../model/provider-content";
import { simulateApiLatency } from "./simulate-latency";

let storeDebugVersion = 0;

function getStoreDebugStamp() {
  storeDebugVersion += 1;
  return {
    label: `snapshot-${storeDebugVersion}`,
  };
}

export async function getUnitedStatesStoreSnapshot() {
  "use cache";

  cacheLife("providerCatalog");
  cacheTag(
    CACHE_TAGS.providerCatalog,
    CACHE_TAGS.prices,
    CACHE_TAGS.planDetails,
  );

  await simulateApiLatency(150);

  const debug = getStoreDebugStamp();

  const mockData = mockUnitedStatesStore;

  return {
    ...mockData,
    __debug: debug,
  };
}

export async function getUnitedStatesPlans() {
  const { store, __debug } = await getUnitedStatesStoreSnapshot();
  const plans = assignPopularity(store.map((bundle) => mapBundleToPlanItem(bundle)));

  return plans.map((plan, index) =>
    index === 0
      ? {
          ...plan,
          bestFor: [...plan.bestFor, `Data cache version: ${__debug.label}`],
        }
      : plan,
  );
}
