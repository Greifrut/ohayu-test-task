import { PlanItem } from "../model/types";

function selectFeaturedPlan(plans: PlanItem[]): string | null {
  const preferred =
    plans.find((plan) => plan.dataAmountGb === 5 && plan.validityDays === 30) ??
    plans.find((plan) => plan.dataAmountGb === 5) ??
    plans[1] ??
    plans[0];

  return preferred?.id ?? null;
}

export function assignPopularity(plans: PlanItem[]): PlanItem[] {
  const featuredPlanId = selectFeaturedPlan(plans);
  if (!featuredPlanId) {
    return plans;
  }

  return plans.map((plan) =>
    plan.id === featuredPlanId
      ? {
          ...plan,
          highlighted: true,
          badge: "Most popular",
        }
      : plan,
  );
}
