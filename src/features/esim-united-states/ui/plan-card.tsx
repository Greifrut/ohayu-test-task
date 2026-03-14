import { Badge } from "@/shared/ui/badge";
import type { KeyboardEvent } from "react";
import type { PlanItem, SupportedCurrency } from "../model/types";

interface PlanCardProps {
  plan: PlanItem;
  isSelected: boolean;
  onSelect: () => void;
  selectedCurrency: SupportedCurrency;
}

function isActivate(event: KeyboardEvent<HTMLElement>) {
  return event.key === "Enter" || event.key === " ";
}

export function PlanCard({
  isSelected,
  onSelect,
  plan,
  selectedCurrency,
}: PlanCardProps) {
  const activePrice = plan.prices[selectedCurrency] ?? plan.prices.USD;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (isActivate(event)) {
          event.preventDefault();
          onSelect();
        }
      }}
      className={`relative cursor-pointer rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
        isSelected ? "border-sky-600 bg-sky-50 shadow-sm" : "border-slate-200 bg-white"
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
      <p className="mt-3 text-3xl font-bold text-slate-900">{activePrice.priceLabel}</p>
      <p className="text-sm text-slate-600">{activePrice.unitPrice}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {plan.bestFor.map((point) => (
          <li className="flex items-center gap-2" key={point}>
            <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-sky-600" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
