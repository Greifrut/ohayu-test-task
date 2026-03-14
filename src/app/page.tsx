import type { Metadata } from "next";
import { HomePage } from "@/features/home/ui/home-page";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Launch page for the Ohayu Next.js migration demo with routes, architecture highlights, and evaluation guidance.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomePage />;
}
