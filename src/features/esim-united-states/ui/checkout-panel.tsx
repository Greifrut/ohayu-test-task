import { Badge } from "@/shared/ui/badge";
import type { PlanItem } from "../model/types";

interface CheckoutPanelProps {
  plans: PlanItem[];
}

export function CheckoutPanel({ plans: planItems }: CheckoutPanelProps) {
  const featuredPlan = planItems.find((plan) => plan.highlighted) ?? planItems[1] ?? planItems[0];
  const sorted = [...planItems].sort((a, b) => a.sortPrice - b.sortPrice);
  const cheapestPlan = sorted[0];
  const displayPlan = featuredPlan ?? cheapestPlan;

  return (
    <aside className="rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_8px_30px_rgba(8,47,73,0.08)]">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Instant order</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">
          United States eSIM
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Pick your profile, pay securely, and activate in minutes.
        </p>
      </div>
      <div className="space-y-3">
        <label
          htmlFor="plan-select"
          className="text-xs font-medium uppercase tracking-wide text-slate-500"
        >
          Quick plan choice
        </label>
        <select
          id="plan-select"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
          defaultValue={displayPlan?.id}
        >
          {planItems.map((plan) => (
            <option value={plan.id} key={plan.id}>
              {plan.dataAmount} / {plan.validity} — {plan.priceLabel}
            </option>
          ))}
        </select>
        <div className="rounded-xl bg-slate-50 p-3">
          {displayPlan ? (
            <>
              <p className="text-xs text-slate-500">Selected package</p>
              <p className="text-lg font-semibold text-slate-900">
                {displayPlan.dataAmount} for {displayPlan.validity}
              </p>
              <p className="text-sm text-slate-600">{displayPlan.priceLabel}</p>
              <div className="mt-2">
                <Badge variant="subtle">Best value: {displayPlan.badge ?? "Balanced"}</Badge>
              </div>
            </>
          ) : null}
        </div>
        <button
          type="button"
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
        >
          Continue with plan
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        No roaming contracts · Instant eSIM delivery · 24/7 support
      </p>
    </aside>
  );
}
