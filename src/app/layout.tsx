import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "@/shared/lib/site-origin";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Ohayu Next.js Demo",
    template: "%s | Ohayu Next.js Demo",
  },
  description:
    "Next.js App Router demo for an eSIM storefront migration with SSR, segmented caching, and production-style quality gates.",
  applicationName: "Ohayu Next.js Demo",
  openGraph: {
    type: "website",
    siteName: "Ohayu Next.js Demo",
    title: "Ohayu Next.js Demo",
    description:
      "SSR-ready eSIM storefront demo focused on country-page rendering, caching, and CI quality gates.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ohayu Next.js Demo",
    description:
      "SSR-ready eSIM storefront demo focused on country-page rendering, caching, and CI quality gates.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
