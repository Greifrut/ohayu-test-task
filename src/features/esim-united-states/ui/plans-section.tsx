import { Section } from "@/shared/ui/section";
import { PlanCard } from "./plan-card";
import type { PlanItem } from "../model/types";

interface PlansSectionProps {
  plans: PlanItem[];
}

export function PlansSection({ plans: planItems }: PlansSectionProps) {
  return (
    <Section
      id="plans"
      eyebrow="US plans"
      title="eSIM USA plans"
      description="Choose a bundle by data amount and usage window. All plans include local US data-only connectivity."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {planItems.map((plan) => (
          <PlanCard plan={plan} key={plan.id} />
        ))}
      </div>
    </Section>
  );
}
