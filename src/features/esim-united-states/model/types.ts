export type SupportedCurrency = "USD" | "EUR";

export type PlanPriceSummary = {
  amountCents: number;
  priceLabel: string;
  unitPrice: string;
  sortPrice: number;
};

export type PlanItem = {
  id: string;
  dataAmount: string;
  validity: string;
  dataAmountGb: number;
  validityDays: number;
  priceLabel: string;
  unitPrice: string;
  sortPrice: number;
  operatorNames: string[];
  operatorDetails?: PlanOperatorItem[];
  badge?: string;
  highlighted?: boolean;
  totalAmountCents?: number;
  prices: Record<SupportedCurrency, PlanPriceSummary>;
  bestFor: string[];
};

export type PlanFeatureItem = {
  heading: string;
  value: string | string[];
};

export type StepItem = {
  order: number;
  title: string;
  subtitle: string;
};

export type BenefitItem = {
  title: string;
  text: string;
};

export type ReviewItem = {
  name: string;
  city: string;
  quote: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type StoreOperator = {
  id: number;
  provider: string;
  country: string;
  name: string;
  speed: string | null;
};

export type PlanOperatorItem = {
  operator: string;
  network?: string;
};

export type StorePrice = {
  id: number;
  currency: string;
  amountCents: number;
};

export type StoreBundle = {
  bundleCodeAndPriceId: string;
  dataAmountGb: number;
  durationDays: number;
  totalAmountCents: number;
  operators: StoreOperator[];
  staticPrices: StorePrice[];
  isAllowedToAutoTopUp: boolean;
};

export type StoreResponse = {
  store: StoreBundle[];
};

export type PlanDetailItemType = "text" | "operators";

export type PlanDetailOperatorItem = {
  id: string;
  icon: string;
  type: "operators";
  title: string;
  operators: PlanOperatorItem[];
};

export type PlanDetailTextItem = {
  id: string;
  icon: string;
  type: "text";
  title: string;
  text: string;
};

export type PlanDetailItem = PlanDetailOperatorItem | PlanDetailTextItem;
