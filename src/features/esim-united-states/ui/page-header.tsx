import { SiteHeader } from "@/shared/ui/site-header";
import { CurrencySelector } from "./currency-selector";

const navItems = [
  { href: "#plans", label: "Plans" },
  { href: "#plan-details", label: "Plan details" },
  { href: "#details", label: "Coverage" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function EsimPageHeader() {
  return <SiteHeader sticky navItems={navItems} actions={<CurrencySelector />} />;
}
