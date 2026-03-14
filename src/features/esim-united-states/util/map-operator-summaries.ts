import { PlanOperatorItem, StoreBundle } from "../model/types";

export function mapOperatorSummaries(bundle: StoreBundle): PlanOperatorItem[] {
  const operators: PlanOperatorItem[] = [];
  const seen = new Set<string>();

  for (const operator of bundle.operators) {
    const key = operator.name.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    operators.push({
      operator: operator.name,
      network: operator.speed || undefined,
    });
  }

  return operators;
}
