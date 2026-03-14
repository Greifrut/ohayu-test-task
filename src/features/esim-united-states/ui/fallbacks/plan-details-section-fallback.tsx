import { Section } from "@/shared/ui/section";
import { SkeletonBlock } from "./skeleton-block";

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
