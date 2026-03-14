"use client";

import type { SupportedCurrency } from "../model/types";
import { usePlanCurrencyStore } from "../store/use-plan-currency-store";

const supportedCurrencies: SupportedCurrency[] = ["USD", "EUR"];

export function CurrencySelector() {
  const selectedCurrency = usePlanCurrencyStore(
    (state) => state.selectedCurrency,
  );
  const setSelectedCurrency = usePlanCurrencyStore(
    (state) => state.setSelectedCurrency,
  );

  return (
    <div
      aria-label="Preferred currency"
      className="inline-flex rounded-full border border-slate-300 bg-white/90 p-1 shadow-sm"
      role="group"
    >
      {supportedCurrencies.map((currency) => {
        const isSelected = selectedCurrency === currency;

        return (
          <button
            aria-pressed={isSelected}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
              isSelected
                ? "bg-sky-700 text-white shadow-[0_8px_18px_rgba(3,105,161,0.22)]"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
            }`}
            key={currency}
            onClick={() => setSelectedCurrency(currency)}
            type="button"
          >
            {currency}
          </button>
        );
      })}
    </div>
  );
}
