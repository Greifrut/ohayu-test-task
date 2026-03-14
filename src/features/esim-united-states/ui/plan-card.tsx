import { Badge } from "@/shared/ui/badge";
import type { PlanItem } from "../model/types";

interface PlanCardProps {
  plan: PlanItem;
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <article
      className={`relative rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
        plan.highlighted ? "border-sky-500 bg-sky-50 shadow-sm" : "border-slate-200 bg-white"
      }`}
    >
      <div className="relative mb-2 h-6">
        {plan.highlighted ? (
          <Badge
            variant="primary"
            className="absolute right-0 top-0 px-3 py-1 shadow-[0_4px_12px_rgba(14,116,144,0.2)]"
          >
            Most popular
          </Badge>
        ) : null}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{plan.validity}</p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-900">{plan.dataAmount}</h3>
      <p className="mt-1 text-sm text-slate-500">High-speed package</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{plan.priceLabel}</p>
      <p className="text-sm text-slate-600">{plan.unitPrice}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {plan.bestFor.map((point) => (
          <li className="flex items-center gap-2" key={point}>
            <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-sky-600" />
            {point}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`mt-5 w-full rounded-xl border px-3 py-2 text-sm font-semibold ${
          plan.highlighted
            ? "border-sky-600 bg-sky-700 text-white hover:bg-sky-800"
            : "border-slate-300 text-slate-800 hover:bg-slate-50"
        }`}
      >
        Add to cart
      </button>
    </article>
  );
}
