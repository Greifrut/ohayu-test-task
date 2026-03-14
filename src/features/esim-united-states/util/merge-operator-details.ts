import { PlanOperatorItem, StoreBundle } from "../model/types";
import { mapOperatorSummaries } from "./map-operator-summaries";

export function mergeOperatorDetailsFromStore(
  store: StoreBundle[],
): PlanOperatorItem[] {
  const operators = store.flatMap((bundle) => mapOperatorSummaries(bundle));
  const uniqueOperators = new Map<string, PlanOperatorItem>();

  for (const operator of operators) {
    const key = operator.operator.toLowerCase();
    if (!uniqueOperators.has(key)) {
      uniqueOperators.set(key, operator);
    }
  }

  return [...uniqueOperators.values()];
}
