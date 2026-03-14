import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./container";

type SiteHeaderNavItem = {
  href: string;
  label: string;
};

interface SiteHeaderProps {
  navItems?: SiteHeaderNavItem[];
  actions?: ReactNode;
  sticky?: boolean;
}

export function SiteHeader({
  navItems = [],
  actions,
  sticky = false,
}: SiteHeaderProps) {
  return (
    <header
      className={`${sticky ? "sticky top-0 z-20" : ""} border-b border-white/70 bg-white/85 backdrop-blur`}
    >
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-700 text-sm font-black text-white shadow-[0_12px_30px_rgba(3,105,161,0.22)]">
            O
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-950">
            Ohayu
          </span>
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-4">
          {navItems.length > 0 ? (
            <nav className="hidden items-center gap-6 xl:flex">
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
          ) : null}
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
