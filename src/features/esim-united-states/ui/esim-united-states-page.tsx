import { Suspense } from "react";
import { EsimPageHeader } from "./page-header";
import { HeroSection } from "./hero-section";
import { DetailsSection } from "./details-section";
import { HowItWorksSection } from "./how-it-works-section";
import { RelatedCountriesSection } from "./related-countries-section";
import { ReviewsSection } from "./reviews-section";
import { SiteFooter } from "./site-footer";
import {
  CheckoutPanelSlot,
  FaqSectionSlot,
  PlanDetailsSectionSlot,
  PlansSectionSlot,
} from "./async-sections";
import {
  CheckoutPanelFallback,
  FaqSectionFallback,
  PlanDetailsSectionFallback,
  PlansSectionFallback,
} from "./section-fallbacks";

export function EsimUnitedStatesPage() {
  return (
    <div className="bg-sky-50/60">
      <EsimPageHeader />
      <main>
        <HeroSection
          checkoutPanel={(
            <Suspense fallback={<CheckoutPanelFallback />}>
              <CheckoutPanelSlot />
            </Suspense>
          )}
        />
        <Suspense fallback={<PlansSectionFallback />}>
          <PlansSectionSlot />
        </Suspense>
        <Suspense fallback={<PlanDetailsSectionFallback />}>
          <PlanDetailsSectionSlot />
        </Suspense>
        <DetailsSection />
        <HowItWorksSection />
        <ReviewsSection />
        <Suspense fallback={<FaqSectionFallback />}>
          <FaqSectionSlot />
        </Suspense>
        <RelatedCountriesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
