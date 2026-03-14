import { Metadata } from "next";
import { EsimUnitedStatesPage } from "@/features/esim-united-states/ui/esim-united-states-page";

export const metadata: Metadata = {
  title: "eSIM for United States | Ohayu Test",
  description:
    "A reproduction of the US eSIM marketing page implemented with Next.js and component composition.",
};

export default function UnitedStatesPage() {
  return <EsimUnitedStatesPage />;
}
