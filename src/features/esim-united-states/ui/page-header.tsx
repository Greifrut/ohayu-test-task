import Link from "next/link";

const navItems = [
  { href: "#plans", label: "Plans" },
  { href: "#plan-details", label: "Plan details" },
  { href: "#details", label: "Coverage" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function EsimPageHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 font-black text-white">
            O
          </span>
          <span className="text-lg font-bold text-slate-900">Ohayu</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              className="text-sm font-medium text-slate-700 transition-colors hover:text-sky-700"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
          >
            USD
          </button>
          <a
            href="#"
            className="hidden rounded-full bg-sky-700 px-3 py-1 text-xs font-semibold text-white transition hover:bg-sky-800 sm:block"
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
}
