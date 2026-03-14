import { reviews } from "../model/static-content";
import { Section } from "@/shared/ui/section";

export function ReviewsSection() {
  return (
    <Section
      id="reviews"
      eyebrow="Traveler feedback"
      title="Reviews about eSIM in the United States"
      description="Real travelers sharing activation speed, speed stability, and support quality."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <blockquote
            className="rounded-2xl border border-slate-200 bg-white p-4"
            key={review.name}
          >
            <p className="mb-4 text-sm italic text-slate-700">{`"${review.quote}"`}</p>
            <p className="text-sm font-semibold text-slate-900">{review.name}</p>
            <p className="text-xs text-slate-500">{review.city}</p>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
