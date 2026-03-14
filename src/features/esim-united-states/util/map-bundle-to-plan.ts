import { PlanItem, StoreBundle } from "../model/types";
import { buildBestForText } from "./build-best-for";
import { mapOperatorSummaries } from "./map-operator-summaries";
import { toUsdLabel } from "./to-usd-label";

export function mapBundleToPlanItem(bundle: StoreBundle): PlanItem {
  const usd =
    bundle.staticPrices.find((price) => price.currency === "USD")
      ?.amountCents ?? bundle.totalAmountCents;
  const dataGb = bundle.dataAmountGb || 1;
  const operatorDetails = mapOperatorSummaries(bundle);

  return {
    id: bundle.bundleCodeAndPriceId,
    dataAmount: `${bundle.dataAmountGb}GB`,
    validity: `${bundle.durationDays} days`,
    dataAmountGb: bundle.dataAmountGb,
    validityDays: bundle.durationDays,
    totalAmountCents: usd,
    priceLabel: toUsdLabel(usd),
    unitPrice: `$${(usd / 100 / dataGb).toFixed(2)} per GB`,
    sortPrice: Number((usd / 100 / dataGb).toFixed(2)),
    operatorNames: operatorDetails.map((entry) => entry.operator),
    operatorDetails,
    bestFor: buildBestForText(bundle),
  };
}
