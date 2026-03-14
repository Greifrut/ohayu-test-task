import type { PlanDetailOperatorItem } from "@/features/esim-united-states/model/types";

interface PlanDetailOperatorsProps {
  operators: PlanDetailOperatorItem["operators"];
}

export function PlanDetailOperators({ operators }: PlanDetailOperatorsProps) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {operators.map((entry) => (
        <span
          key={entry.operator}
          className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-slate-700"
        >
          <span>{entry.operator}</span>
          {entry.network ? <span className="text-slate-500">· {entry.network}</span> : null}
        </span>
      ))}
    </div>
  );
}
