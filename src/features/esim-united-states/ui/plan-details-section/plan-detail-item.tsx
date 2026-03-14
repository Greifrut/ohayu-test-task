import { PlanDetailContent } from "./plan-detail-content";
import { PlanDetailIcon } from "./plan-detail-icon";
import type { PlanDetailItem } from "@/features/esim-united-states/model/types";

interface PlanDetailItemProps {
  item: PlanDetailItem;
}

export function PlanDetailItem({ item }: PlanDetailItemProps) {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <PlanDetailIcon icon={item.icon} />
        <PlanDetailContent item={item} />
      </div>
    </li>
  );
}
