import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "../constant/cache-tags";
import { buildBestForText } from "../util/build-best-for";
import { mapOperatorSummaries } from "../util/map-operator-summaries";
import { toUsdLabel } from "../util/to-usd-label";
import {
  mockUnitedStatesStore,
  providerPlanDetailItems,
} from "./provider-content";
import { seoFaqs } from "./seo-content";
import type {
  FaqItem,
  PlanDetailItem,
  PlanItem,
  PlanOperatorItem,
  StoreBundle,
  StoreResponse,
} from "./types";

function mapBundleToPlanItem(bundle: StoreBundle): PlanItem {
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

function selectFeaturedPlan(plans: PlanItem[]): string | null {
  const preferred =
    plans.find((plan) => plan.dataAmountGb === 5 && plan.validityDays === 30) ??
    plans.find((plan) => plan.dataAmountGb === 5) ??
    plans[1] ??
    plans[0];

  return preferred?.id ?? null;
}

function assignPopularity(plans: PlanItem[]): PlanItem[] {
  const featuredPlanId = selectFeaturedPlan(plans);
  if (!featuredPlanId) {
    return plans;
  }

  return plans.map((plan) =>
    plan.id === featuredPlanId
      ? {
          ...plan,
          highlighted: true,
          badge: "Most popular",
        }
      : plan,
  );
}

function mergeOperatorDetailsFromStore(
  store: StoreBundle[],
): PlanOperatorItem[] {
  const operators = store.flatMap((bundle) => mapOperatorSummaries(bundle));
  const uniqueOperators = new Map<string, PlanOperatorItem>();

  for (const operator of operators) {
    const key = operator.operator.toLowerCase();
    if (!uniqueOperators.has(key)) {
      uniqueOperators.set(key, operator);
    }
  }

  return [...uniqueOperators.values()];
}

export async function getUnitedStatesStoreSnapshot(): Promise<StoreResponse> {
  "use cache";

  cacheLife("providerCatalog");
  cacheTag(
    CACHE_TAGS.providerCatalog,
    CACHE_TAGS.prices,
    CACHE_TAGS.planDetails,
  );

  return mockUnitedStatesStore;
}

export async function getUnitedStatesPlans(): Promise<PlanItem[]> {
  const { store } = await getUnitedStatesStoreSnapshot();
  return assignPopularity(store.map((bundle) => mapBundleToPlanItem(bundle)));
}

export async function getUnitedStatesPlanDetails(): Promise<PlanDetailItem[]> {
  const { store } = await getUnitedStatesStoreSnapshot();
  const operators = mergeOperatorDetailsFromStore(store).slice(0, 3);

  return providerPlanDetailItems.map((item) =>
    item.type === "operators"
      ? {
          ...item,
          operators,
        }
      : item,
  );
}

export async function getUnitedStatesFaqs(): Promise<FaqItem[]> {
  "use cache";

  cacheLife("seoManaged");
  cacheTag(CACHE_TAGS.faqs);

  return seoFaqs;
}
