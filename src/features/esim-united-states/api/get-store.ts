import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { assignPopularity } from "../util/assign-popularity";
import { mapBundleToPlanItem } from "../util/map-bundle-to-plan";
import type { StoreResponse } from "../model/types";
import { fetchMockJson } from "./fetch-mock";

let storeDebugVersion = 0;

function getStoreDebugStamp() {
  storeDebugVersion += 1;
  return {
    version: storeDebugVersion,
    label: `snapshot-${storeDebugVersion}`,
    generatedAt: new Date().toISOString(),
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

  const debug = getStoreDebugStamp();

  const mockData = await fetchMockJson<StoreResponse>({
    path: "/api/mock/esim/united-states-us/store",
  });

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
