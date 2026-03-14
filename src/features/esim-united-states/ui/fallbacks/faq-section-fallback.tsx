import { Section } from "@/shared/ui/section";
import { SkeletonBlock } from "./skeleton-block";

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
