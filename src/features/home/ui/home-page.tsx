import { Badge } from "@/shared/ui/badge";
import { Container } from "@/shared/ui/container";
import Link from "next/link";

const reviewSignals = [
  "Segmented server caching with tag-based revalidation",
  "Server-first App Router rendering with isolated client islands",
  "Production build, typecheck, unit/integration, and E2E coverage",
];

const demoHighlights = [
  {
    title: "Country-page execution",
    text: "A realistic United States eSIM destination page with plan pricing, plan details, FAQs, and static marketing content.",
  },
  {
    title: "Migration-focused architecture",
    text: "The app keeps data fetching on the server, limits client JavaScript, and separates content by update cadence.",
  },
  {
    title: "Review-ready delivery",
    text: "The homepage frames the demo quickly so a reviewer can jump straight to the route, tests, and caching story.",
  },
];

const reviewerChecklist = [
  "Open the home page first for context, then review the United States country page.",
  "Use the revalidation endpoint to invalidate prices, plan details, and FAQs independently.",
  "Run the production build and Playwright suite to verify the non-dev path.",
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.22),_transparent_36%),linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_44%,_#ffffff_100%)] text-slate-950">
      <header className="border-b border-sky-100/80 bg-white/80 backdrop-blur">
        <Container className="flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-700 text-sm font-black text-white shadow-[0_12px_30px_rgba(3,105,161,0.22)]">
              O
            </span>
            <span className="text-base font-semibold tracking-tight text-slate-900">
              Ohayu Next.js Demo
            </span>
          </Link>
          <Link
            href="/esim/united-states-us"
            className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:bg-sky-50"
          >
            Open United States demo page
          </Link>
        </Container>
      </header>

      <main>
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:py-24">
          <section className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">Next.js App Router</Badge>
              <Badge>SSR and cache tags</Badge>
              <Badge>Interview demo</Badge>
            </div>
            <div className="space-y-4">
              <p className="eyebrow">Migration demo</p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                SSR-ready storefront demo for the Ohayu migration
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                This repository is organized as a reviewable Next.js migration
                slice: a real country page, isolated cache domains, a
                production-safe revalidation path, and CI gates that exercise
                both development and production behavior.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/esim/united-states-us"
                className="rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(3,105,161,0.28)] transition hover:bg-sky-800"
              >
                Open United States demo page
              </Link>
              <Link
                href="/esim/united-states-us#plans"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Jump to plans
              </Link>
            </div>
            <ul className="grid gap-3 pt-2 text-sm text-slate-700 sm:grid-cols-3">
              {reviewSignals.map((signal) => (
                <li
                  key={signal}
                  className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                >
                  {signal}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[2rem] border border-sky-100 bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.24)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
              Reviewer checklist
            </p>
            <ol className="mt-4 space-y-4">
              {reviewerChecklist.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-sky-200">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-6 text-slate-200">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </Container>

        <Container className="grid gap-4 pb-16 md:grid-cols-3">
          {demoHighlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
            >
              <p className="text-sm font-semibold text-slate-900">
                {highlight.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {highlight.text}
              </p>
            </article>
          ))}
        </Container>
      </main>
    </div>
  );
}
