import type { SupportedCurrency } from "../model/types";

export function formatPlanPrice(cents: number, currency: SupportedCurrency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatPerUnitPrice(
  cents: number,
  dataAmountGb: number,
  currency: SupportedCurrency,
) {
  const normalizedDataAmount = dataAmountGb || 1;
  const perUnit = cents / 100 / normalizedDataAmount;

  return `${formatPlanPrice(Math.round(perUnit * 100), currency)} per GB`;
}
