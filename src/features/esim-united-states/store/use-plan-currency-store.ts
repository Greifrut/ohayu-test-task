"use client";

import { create } from "zustand";
import type { SupportedCurrency } from "../model/types";

const defaultCurrency: SupportedCurrency = "USD";

type PlanCurrencyState = {
  selectedCurrency: SupportedCurrency;
  setSelectedCurrency: (currency: SupportedCurrency) => void;
};

export const usePlanCurrencyStore = create<PlanCurrencyState>((set) => ({
  selectedCurrency: defaultCurrency,
  setSelectedCurrency: (currency) =>
    set((state) =>
      state.selectedCurrency === currency
        ? state
        : { selectedCurrency: currency },
    ),
}));

export function resetPlanCurrencyStore() {
  usePlanCurrencyStore.setState({ selectedCurrency: defaultCurrency });
}
