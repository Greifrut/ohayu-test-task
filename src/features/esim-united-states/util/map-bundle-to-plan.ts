import {
  PlanItem,
  PlanPriceSummary,
  StoreBundle,
  SupportedCurrency,
} from "../model/types";
import { buildBestForText } from "./build-best-for";
import { formatPerUnitPrice, formatPlanPrice } from "./format-plan-price";
import { mapOperatorSummaries } from "./map-operator-summaries";

const supportedCurrencies: SupportedCurrency[] = ["USD", "EUR"];

function getBundleAmountForCurrency(
  bundle: StoreBundle,
  currency: SupportedCurrency,
): number {
  return (
    bundle.staticPrices.find((price) => price.currency === currency)
      ?.amountCents ?? bundle.totalAmountCents
  );
}

function buildPlanPriceSummary(
  bundle: StoreBundle,
  currency: SupportedCurrency,
): PlanPriceSummary {
  const amountCents = getBundleAmountForCurrency(bundle, currency);
  const dataGb = bundle.dataAmountGb || 1;

  return {
    amountCents,
    priceLabel: formatPlanPrice(amountCents, currency),
    unitPrice: formatPerUnitPrice(amountCents, dataGb, currency),
    sortPrice: Number((amountCents / 100 / dataGb).toFixed(2)),
  };
}

export function mapBundleToPlanItem(bundle: StoreBundle): PlanItem {
  const operatorDetails = mapOperatorSummaries(bundle);
  const prices = supportedCurrencies.reduce<Record<SupportedCurrency, PlanPriceSummary>>(
    (result, currency) => {
      result[currency] = buildPlanPriceSummary(bundle, currency);
      return result;
    },
    {
      USD: buildPlanPriceSummary(bundle, "USD"),
      EUR: buildPlanPriceSummary(bundle, "EUR"),
    },
  );

  return {
    id: bundle.bundleCodeAndPriceId,
    dataAmount: `${bundle.dataAmountGb}GB`,
    validity: `${bundle.durationDays} days`,
    dataAmountGb: bundle.dataAmountGb,
    validityDays: bundle.durationDays,
    totalAmountCents: prices.USD.amountCents,
    priceLabel: prices.USD.priceLabel,
    unitPrice: prices.USD.unitPrice,
    sortPrice: prices.USD.sortPrice,
    operatorNames: operatorDetails.map((entry) => entry.operator),
    operatorDetails,
    prices,
    bestFor: buildBestForText(bundle),
  };
}
