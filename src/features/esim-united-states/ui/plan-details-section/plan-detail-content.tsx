import type {
  PlanDetailItem,
  PlanDetailTextItem,
} from "@/features/esim-united-states/model/types";
import { PlanDetailOperators } from "./plan-detail-operators";

export function PlanDetailContent({ item }: { item: PlanDetailItem }) {
  return (
    <div className="flex-1">
      <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
      {renderContent(item)}
    </div>
  );
}

function renderContent(item: PlanDetailItem) {
  if (item.type === "operators") {
    return <PlanDetailOperators operators={item.operators} />;
  }

  return <PlanDetailText text={item.text} />;
}

function PlanDetailText({ text }: { text: PlanDetailTextItem["text"] }) {
  return <p className="mt-2 text-sm text-slate-700">{text}</p>;
}
