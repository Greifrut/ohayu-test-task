import { StoreBundle } from "../model/types";

export function buildBestForText(bundle: StoreBundle): string[] {
  const operatorText = bundle.operators
    .map(
      (operator) =>
        `${operator.name}${operator.speed ? ` (${operator.speed})` : ""}`,
    )
    .slice(0, 3);

  return [
    `Operators: ${operatorText.join(", ")}`,
    "Data only",
    bundle.isAllowedToAutoTopUp ? "Top-up available" : "Top-up unavailable",
  ];
}
