import Link from "next/link";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import type { PanelCardProps } from "@/types/dashboard-home.types";

/** Tarjeta con cabecera y filas separadas, base de los paneles de `B1`. */
export function PanelCard({
  title,
  icon,
  count,
  seeAllHref,
  isEmpty,
  emptyText,
  children,
}: PanelCardProps) {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-card">
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h2 className="flex items-center gap-2.5 font-display text-base font-semibold text-text-primary">
          {icon}
          {title}
        </h2>

        {count !== undefined && count > 0 ? (
          <span className="rounded-pill bg-danger/15 px-2.5 py-0.5 text-xs font-semibold text-danger">
            {count}
          </span>
        ) : null}

        {seeAllHref ? (
          <Link
            href={seeAllHref}
            className="text-[13px] font-semibold text-brand-violet transition-opacity hover:opacity-80"
          >
            {DASHBOARD_COPY.seeAll}
          </Link>
        ) : null}
      </header>

      {isEmpty ? (
        <p className="px-5 py-8 text-center text-[13px] text-text-muted">
          {emptyText}
        </p>
      ) : (
        children
      )}
    </section>
  );
}
