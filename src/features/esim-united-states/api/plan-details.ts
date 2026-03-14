import { mergeOperatorDetailsFromStore } from "../util/merge-operator-details";
import { getUnitedStatesStoreSnapshot } from "./get-store";
import { providerPlanDetailItems } from "../model/provider-content";
import { simulateApiLatency } from "./simulate-latency";

export async function getUnitedStatesPlanDetails() {
  const { store, __debug } = await getUnitedStatesStoreSnapshot();
  const operators = mergeOperatorDetailsFromStore(store).slice(0, 3);

  await simulateApiLatency(150);

  const planDetailsData = { planDetails: providerPlanDetailItems };

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
