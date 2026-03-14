import { Section } from "@/shared/ui/section";
import type { FaqItem } from "../model/types";

interface FaqSectionProps {
  faqs: FaqItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const hasFaqs = faqs.length > 0;

  return (
    <Section
      id="faq"
      eyebrow="Support"
      title="Frequently asked questions"
      description="Clear answers before checkout"
    >
      <div className="mx-auto grid max-w-3xl gap-3">
        {hasFaqs ? (
          faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-white px-4 py-3 w-full"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
            </details>
          ))
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            Frequently asked questions are currently unavailable. Refresh to retry.
          </p>
        )}
      </div>
    </Section>
  );
}
