import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "subtle";
  className?: string;
}

export function Badge({ children, variant = "subtle", className = "" }: BadgeProps) {
  const styles =
    variant === "primary"
      ? "bg-sky-700 text-white"
      : "border border-sky-200 bg-sky-50 text-sky-700";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-tight ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
