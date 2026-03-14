import { Section } from "@/shared/ui/section";
import type { PlanDetailItem as PlantDetailsItemType } from "../model/types";
import { PlanDetailItem } from "./plan-details-section/plan-detail-item";

interface PlanDetailsSectionProps {
  items: PlantDetailsItemType[];
}

export function PlanDetailsSection({ items }: PlanDetailsSectionProps) {
  return (
    <Section
      id="plan-details"
      eyebrow="Plan details"
      title="United States eSIM plan details"
      description="Important usage and technical details before you pick your plan."
      className="pt-8 sm:pt-10"
    >
      <ul className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <PlanDetailItem key={item.id} item={item} />
        ))}
      </ul>
    </Section>
  );
}
