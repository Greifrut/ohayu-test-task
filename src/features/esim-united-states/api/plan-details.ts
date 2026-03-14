import { providerPlanDetailItems } from "../model/provider-content";
import { mergeOperatorDetailsFromStore } from "../util/merge-operator-details";
import { getUnitedStatesStoreSnapshot } from "./get-store";

export async function getUnitedStatesPlanDetails() {
  const { store, __debug } = await getUnitedStatesStoreSnapshot();
  const operators = mergeOperatorDetailsFromStore(store).slice(0, 3);

  return providerPlanDetailItems.map((item) =>
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
