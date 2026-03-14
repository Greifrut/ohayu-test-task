import { Metadata } from "next";
import { EsimUnitedStatesPage } from "@/features/esim-united-states/ui/esim-united-states-page";

export const metadata: Metadata = {
  title: "United States eSIM Page",
  description:
    "United States country-page demo implemented with Next.js App Router, segmented cache tags, and server-first rendering.",
  alternates: {
    canonical: "/esim/united-states-us",
  },
  openGraph: {
    title: "United States eSIM Page",
    description:
      "United States country-page demo implemented with Next.js App Router, segmented cache tags, and server-first rendering.",
    url: "/esim/united-states-us",
    type: "website",
  },
};

export default function UnitedStatesPage() {
  return <EsimUnitedStatesPage />;
}
