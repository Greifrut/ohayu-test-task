import { mergeOperatorDetailsFromStore } from "../util/merge-operator-details";
import type { PlanDetailItem } from "../model/types";
import { getUnitedStatesStoreSnapshot } from "./get-store";
import { fetchMockJson } from "./fetch-mock";

export async function getUnitedStatesPlanDetails() {
  const { store, __debug } = await getUnitedStatesStoreSnapshot();
  const operators = mergeOperatorDetailsFromStore(store).slice(0, 3);
  const planDetailsData = await fetchMockJson<{ planDetails: PlanDetailItem[] }>({
    path: "/api/mock/esim/united-states-us/plan-details",
  });

  return planDetailsData.planDetails.map((item) =>
    item.type === "operators"
      ? {
          ...item,
          operators,
        }
      : {
          ...item,
          text: `${item.text} (${__debug.label})`,
        },
  );
}
