import { relatedCountries } from "../model/static-content";

export function RelatedCountriesSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
      <div className="rounded-2xl bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Travel options</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Explore more destination eSIMs</h2>
        <p className="mt-2 text-sm text-slate-600">
          If your trip extends across borders, compare these popular countries.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {relatedCountries.map((country) => (
            <a
              key={country}
              href="#"
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              {country}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
