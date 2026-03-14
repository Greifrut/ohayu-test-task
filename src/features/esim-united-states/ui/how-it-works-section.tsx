import { steps } from "../model/static-content";
import { Section } from "@/shared/ui/section";

export function HowItWorksSection() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="Get connected in three quick steps"
      description="From purchase to activation, this is a streamlined flow for travelers and frequent cross-border users."
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <li
            key={step.order}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-700 text-sm font-semibold text-white">
              {step.order}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{step.subtitle}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
