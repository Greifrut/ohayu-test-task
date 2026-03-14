import { Section } from "@/shared/ui/section";
import { SkeletonBlock } from "./skeleton-block";

export function PlansSectionFallback() {
  return (
    <Section
      id="plans"
      eyebrow="US plans"
      title="eSIM USA plans"
      description="Choose a bundle by data amount and usage window. All plans include local US data-only connectivity."
      className="pb-20"
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
          </div>
        ))}
      </div>
    </Section>
  );
}
