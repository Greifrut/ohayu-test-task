import { Suspense } from "react";
import { DetailsSection } from "./details-section";
import { HeroSection } from "./hero-section";
import { HowItWorksSection } from "./how-it-works-section";
import { EsimPageHeader } from "./page-header";
import { RelatedCountriesSection } from "./related-countries-section";
import { ReviewsSection } from "./reviews-section";
import { SiteFooter } from "./site-footer";
import { FaqSection } from "./faq-section";
import { getUnitedStatesFaqs } from "../api/get-faqs";

import { PlanDetailsSectionFallback, PlansSectionFallback } from "./section-fallbacks";
import { PlanDetailsSectionSlot } from "./slots/plan-details-section-slot";
import { PlansSectionSlot } from "./slots/plans-section-slot";

export async function EsimUnitedStatesPage() {
  const faqs = await getUnitedStatesFaqs();

  return (
    <div className="bg-sky-50/60">
      <EsimPageHeader />
      <main>
        <HeroSection />
        <Suspense fallback={<PlansSectionFallback />}>
          <PlansSectionSlot />
        </Suspense>
        <Suspense fallback={<PlanDetailsSectionFallback />}>
          <PlanDetailsSectionSlot />
        </Suspense>
        <DetailsSection />
        <HowItWorksSection />
        <ReviewsSection />
        <FaqSection faqs={faqs} />
        <RelatedCountriesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
