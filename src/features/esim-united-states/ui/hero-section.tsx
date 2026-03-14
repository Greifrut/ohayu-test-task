import { Badge } from "@/shared/ui/badge";
import type { ReactNode } from "react";

interface HeroSectionProps {
  checkoutPanel: ReactNode;
}

export function HeroSection({ checkoutPanel }: HeroSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-5">
          <p className="eyebrow">United States eSIM plans</p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Data plans designed for US travel and everyday city navigation
          </h1>
          <p className="max-w-2xl text-base text-slate-700">
            Buy local US eSIM coverage with transparent pricing, fast activation, and 4G/5G
            compatibility. Activate from your phone and start browsing immediately.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">eSIM + QR Delivery</Badge>
            <Badge>No roaming bundles</Badge>
            <Badge>Valid from airport to countryside</Badge>
          </div>
          <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <p className="rounded-xl bg-white/75 p-3">
              <strong className="block text-slate-900">Coverage:</strong>
              200+ cities across the US and major travel corridors.
            </p>
            <p className="rounded-xl bg-white/75 p-3">
              <strong className="block text-slate-900">Activation:</strong>
              Immediate via QR code sent by email after checkout.
            </p>
          </div>
        </div>
        {checkoutPanel}
      </div>
    </section>
  );
}
