"use client";

import { useMemo, useState } from "react";
import { Section } from "@/shared/ui/section";
import { PlanCard } from "./plan-card";
import type { PlanItem } from "../model/types";

interface PlansSectionProps {
  plans: PlanItem[];
}

export function PlansSection({ plans: planItems }: PlansSectionProps) {
  const initialPlan = useMemo(
    () => planItems.find((plan) => plan.highlighted) ?? planItems[0],
    [planItems],
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlan?.id ?? "");
  const selectedPlan = planItems.find((plan) => plan.id === selectedPlanId) ?? initialPlan;

  return (
    <>
      <Section
        id="plans"
        eyebrow="US plans"
        title="eSIM USA plans"
        description="Choose a bundle by data amount and usage window. All plans include local US data-only connectivity."
        className="pb-20"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {planItems.map((plan) => (
            <PlanCard
              isSelected={plan.id === selectedPlanId}
              key={plan.id}
              onSelect={() => setSelectedPlanId(plan.id)}
              plan={plan}
            />
          ))}
        </div>
      </Section>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-slate-900/95 px-4 py-3 shadow-[0_-10px_30px_rgba(8,47,73,0.24)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-xl bg-slate-800/75 px-4 py-3 text-white">
          {selectedPlan ? (
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
                Chosen plan
              </p>
              <p className="mt-1 truncate text-sm font-semibold sm:text-base">
                {selectedPlan.dataAmount} / {selectedPlan.validity}
              </p>
              <p className="mt-1 text-xs text-slate-300">{selectedPlan.priceLabel}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-200">Select a plan to continue</p>
          )}
          <button
            type="button"
            disabled={!selectedPlan}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
