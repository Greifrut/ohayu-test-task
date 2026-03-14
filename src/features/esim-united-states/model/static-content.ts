import type { PlanFeatureItem, ReviewItem, StepItem } from "./types";

export const planFeatures: PlanFeatureItem[] = [
  { heading: "Network Coverage", value: ["AT&T", "Verizon", "T-Mobile USA"] },
  { heading: "Region", value: "United States" },
  { heading: "SIM Type", value: "eSIM / QR activation" },
  {
    heading: "Connectivity",
    value: ["5G and 4G LTE", "Works in major cities and travel corridors", "Instant delivery by email"],
  },
];

export const steps: StepItem[] = [
  {
    order: 1,
    title: "Select your plan",
    subtitle:
      "Pick the right plan for trip length and usage, then add it to cart and continue to payment.",
  },
  {
    order: 2,
    title: "Get your eSIM QR code",
    subtitle:
      "After checkout you’ll receive the activation code to your email with instant delivery in seconds.",
  },
  {
    order: 3,
    title: "Activate on your phone",
    subtitle:
      "Scan the QR code in iOS or Android settings and stay connected the moment you arrive.",
  },
];

export const benefits = [
  "Instant delivery in minutes, no physical SIM shipping.",
  "Dedicated US local number options available at checkout.",
  "No roaming contracts, no hidden service fees.",
  "Plan can be topped up or extended later if needed.",
];

export const reviews: ReviewItem[] = [
  {
    name: "Elena Petrova",
    city: "New York",
    quote:
      "I landed in New York and had data in under 4 minutes. Setup was straightforward even while on a budget.",
  },
  {
    name: "Marco Rossi",
    city: "Los Angeles",
    quote:
      "Great value for short trips. Speed was stable during shopping and train rides, and support replied quickly.",
  },
  {
    name: "Sara Kim",
    city: "Miami",
    quote:
      "The plan page was clear and the download instructions were easy. Saved me a lot compared to airport SIM vending.",
  },
];

export const relatedCountries = [
  "Canada",
  "Mexico",
  "Brazil",
  "United Kingdom",
  "France",
  "Portugal",
  "Spain",
  "Germany",
];

export const copyrightYear = 2026;
