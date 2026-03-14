import { Section } from "@/shared/ui/section";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-200/70 ${className}`} />;
}

export function CheckoutPanelFallback() {
  return (
    <aside className="rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_8px_30px_rgba(8,47,73,0.08)]">
      <SkeletonBlock className="h-4 w-24" />
      <SkeletonBlock className="mt-3 h-8 w-40" />
      <SkeletonBlock className="mt-2 h-4 w-64" />
      <SkeletonBlock className="mt-5 h-11 w-full" />
      <SkeletonBlock className="mt-3 h-24 w-full" />
      <SkeletonBlock className="mt-4 h-12 w-full" />
    </aside>
  );
}

export function PlansSectionFallback() {
  return (
    <Section
      id="plans"
      eyebrow="US plans"
      title="eSIM USA plans"
      description="Choose a bundle by data amount and usage window. All plans include local US data-only connectivity."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5">
            <SkeletonBlock className="h-5 w-24" />
            <SkeletonBlock className="mt-4 h-8 w-20" />
            <SkeletonBlock className="mt-2 h-4 w-32" />
            <SkeletonBlock className="mt-5 h-10 w-28" />
            <SkeletonBlock className="mt-2 h-4 w-24" />
            <div className="mt-5 space-y-2">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-5/6" />
              <SkeletonBlock className="h-4 w-4/6" />
            </div>
            <SkeletonBlock className="mt-6 h-10 w-full" />
          </div>
        ))}
      </div>
    </Section>
  );
}

export function PlanDetailsSectionFallback() {
  return (
    <Section
      id="plan-details"
      eyebrow="Plan details"
      title="United States eSIM plan details"
      description="Important usage and technical details before you pick your plan."
      className="pt-8 sm:pt-10"
    >
      <div className="grid gap-3 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <SkeletonBlock className="h-9 w-9 rounded-full" />
              <div className="flex-1">
                <SkeletonBlock className="h-4 w-40" />
                <SkeletonBlock className="mt-3 h-4 w-full" />
                <SkeletonBlock className="mt-2 h-4 w-5/6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function FaqSectionFallback() {
  return (
    <Section
      id="faq"
      eyebrow="Support"
      title="Frequently asked questions"
      description="Clear answers before checkout"
    >
      <div className="mx-auto grid max-w-3xl gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <SkeletonBlock className="h-5 w-3/4" />
            <SkeletonBlock className="mt-3 h-4 w-full" />
            <SkeletonBlock className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </div>
    </Section>
  );
}
