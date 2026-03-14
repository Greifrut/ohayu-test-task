import type { Metadata } from "next";
import { EsimUnitedStatesPage } from "@/features/esim-united-states/ui/esim-united-states-page";

export const metadata: Metadata = {
  title: "eSIM for United States | Ohayu",
  description:
    "Local eSIM plans for the United States with instant QR delivery and 4G/5G coverage across major operators.",
};

export default function UnitedStatesEsimPage() {
  return <EsimUnitedStatesPage />;
}
