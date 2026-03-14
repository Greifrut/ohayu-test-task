import { providerPlanDetailItems } from "../model/provider-content";
import { mergeOperatorDetailsFromStore } from "../util/merge-operator-details";
import { getUnitedStatesStoreSnapshot } from "./get-store";

export async function getUnitedStatesPlanDetails() {
  const { store } = await getUnitedStatesStoreSnapshot();
  const operators = mergeOperatorDetailsFromStore(store).slice(0, 3);

  return providerPlanDetailItems.map((item) =>
    item.type === "operators"
      ? {
          ...item,
          operators,
        }
      : item,
  );
}
