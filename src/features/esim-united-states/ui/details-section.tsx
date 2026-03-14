import { planFeatures, benefits } from "../model/static-content";
import { Section } from "@/shared/ui/section";

export function DetailsSection() {
  return (
    <Section
      id="details"
      eyebrow="Coverage facts"
      title="Why choose this eSIM for the United States"
      description="The package is built for simplicity: reliable 4G/5G on major operators with instant activation and no roaming traps."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {planFeatures.map((item) => (
            <article key={item.heading} className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-slate-900">{item.heading}</h3>
              {Array.isArray(item.value) ? (
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {item.value.map((entry) => (
                    <li key={entry}>• {entry}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-slate-600">{item.value}</p>
              )}
            </article>
          ))}
        </div>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">What we include</h3>
          <ul className="mt-3 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-600" />
                {benefit}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}
