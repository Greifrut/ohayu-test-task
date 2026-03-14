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

const hashValue = (input: string): number => {
  let hash = 0;

  for (const character of input) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return hash;
};

const pickBySeed = <T,>(items: readonly T[], seed: number): T => items[seed % items.length];

const buildSuffix = (seed: number): string => String(seed % 100000).padStart(5, "0");

const priceJitter = (base: number, seed: number): number => {
  const jitterPercent = ((seed % 161) - 80) / 1000;
  const adjusted = base * (1 + jitterPercent);

  return Math.max(99, Math.round(adjusted / 5) * 5);
};

export function randomizeFaqs(faqs: readonly FaqItem[], version: number): FaqItem[] {
  return faqs.map((faq) => ({
    ...faq,
    answer: `${faq.answer} ${pickBySeed(FAQ_APPENDIXES, hashValue(`${faq.question}:${version}`))} [${buildSuffix(hashValue(`${faq.answer}:${version}`))}]`,
  }));
}

export function randomizeStoreResponse(source: StoreResponse, version: number): StoreResponse {
  return {
    ...source,
    store: source.store.map((bundle) => {
      const usdSeed = hashValue(`${bundle.bundleCodeAndPriceId}:usd:${version}`);
      const eurSeed = hashValue(`${bundle.bundleCodeAndPriceId}:eur:${version}`);
      const usd = bundle.staticPrices.find((price) => price.currency === "USD");
      const eur = bundle.staticPrices.find((price) => price.currency === "EUR");

      const updatedUsd = usd
        ? priceJitter(usd.amountCents, usdSeed)
        : Math.round(bundle.totalAmountCents * 1.01);
      const updatedEur = eur
        ? priceJitter(eur.amountCents, eurSeed)
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

export function randomizePlanDetailText(
  items: readonly PlanDetailItem[],
  version: number,
): PlanDetailItem[] {
  return items.map((item) => {
    if (item.type !== "text") {
      return item;
    }

    const appendixSeed = hashValue(`${item.id}:${version}`);
    const enrichedText = `${item.text} ${pickBySeed(DETAIL_APPENDIXES, appendixSeed)} [${buildSuffix(hashValue(`${item.text}:${version}`))}]`;

    return {
      ...item,
      text: enrichedText,
    };
  });
}
