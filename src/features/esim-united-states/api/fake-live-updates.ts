import { faker } from "@faker-js/faker";

import type { FaqItem, PlanDetailItem, StoreResponse } from "../model/types";

const FAQ_APPENDIXES = [
  "Check our coverage map before you travel.",
  "Activation depends on SIM settings and OS version.",
  "Use this profile in regions with good LTE/5G fallback behavior.",
  "You can usually switch to this plan during checkout window.",
  "Price and availability may differ by traffic and date.",
];

const DETAIL_APPENDIXES = [
  "Activation is typically immediate after checkout.",
  "Check device compatibility before selecting the profile.",
  "Most providers process within one business day for major operators.",
  "Keep your OS and eSIM settings up to date.",
];

const priceJitter = (base: number): number => {
  const jitterPercent = faker.number.float({ min: -0.08, max: 0.08, fractionDigits: 3 });
  const adjusted = base * (1 + jitterPercent);

  return Math.max(99, Math.round(adjusted / 5) * 5);
};

export function randomizeFaqs(faqs: readonly FaqItem[]): FaqItem[] {
  return faqs.map((faq) => ({
    ...faq,
    answer: `${faq.answer} ${faker.helpers.arrayElement(FAQ_APPENDIXES)} [${faker.string.numeric(5)}]`,
  }));
}

export function randomizeStoreResponse(source: StoreResponse): StoreResponse {
  return {
    ...source,
    store: source.store.map((bundle) => {
      const usd = bundle.staticPrices.find((price) => price.currency === "USD");
      const eur = bundle.staticPrices.find((price) => price.currency === "EUR");

      const updatedUsd = usd ? priceJitter(usd.amountCents) : Math.round(bundle.totalAmountCents * 1.01);
      const updatedEur = eur
        ? priceJitter(eur.amountCents)
        : Math.max(99, Math.round(updatedUsd / 0.84));

      return {
        ...bundle,
        totalAmountCents: updatedUsd,
        staticPrices: bundle.staticPrices.map((entry) => {
          if (entry.currency === "USD") {
            return {
              ...entry,
              amountCents: updatedUsd,
            };
          }

          if (entry.currency === "EUR") {
            return {
              ...entry,
              amountCents: updatedEur,
            };
          }

          return entry;
        }),
      };
    }),
  };
}

export function randomizePlanDetailText(items: readonly PlanDetailItem[]): PlanDetailItem[] {
  return items.map((item) => {
    if (item.type !== "text") {
      return item;
    }

    const enrichedText = `${item.text} ${faker.helpers.arrayElement(DETAIL_APPENDIXES)} [${faker.string.numeric(5)}]`;

    return {
      ...item,
      text: enrichedText,
    };
  });
}
