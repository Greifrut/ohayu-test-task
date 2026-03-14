import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { mergeOperatorDetailsFromStore } from "../util/merge-operator-details";
import { getUnitedStatesStoreSnapshot } from "./get-store";
import { providerPlanDetailItems } from "../model/provider-content";
import { getContentVersions } from "./content-version-store";
import { randomizePlanDetailText } from "./fake-live-updates";
import { simulateApiLatency } from "./simulate-latency";

export async function getUnitedStatesPlanDetails() {
  "use cache";

  cacheLife("providerCatalog");
  cacheTag(CACHE_TAGS.planDetails);

  await simulateApiLatency(150);

  const { store } = await getUnitedStatesStoreSnapshot();
  const { planDetails, providerCatalog } = await getContentVersions();
  const operators = mergeOperatorDetailsFromStore(store).slice(0, 3);
  const planDetailsData = {
    planDetails: randomizePlanDetailText(providerPlanDetailItems, providerCatalog + planDetails),
  };

  return planDetailsData.planDetails.map((item) =>
    item.type === "operators"
      ? {
          ...item,
          operators,
        }
      : item,
  );
}
