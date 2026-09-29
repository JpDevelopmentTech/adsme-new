import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import type { PanelCardProps } from "@/types/dashboard-home.types";

/** Panel con cabecera y filas separadas por filete, base de `B1`. */
export function PanelCard({
  title,
  subtitle,
  icon,
  count,
  seeAllHref,
  isEmpty,
  emptyText,
  children,
}: PanelCardProps) {
  return (
    <section className="glass-panel flex h-full flex-col overflow-hidden rounded-card">
      <header className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className="flex items-center gap-2.5 font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {icon}
            {title}
          </h2>
          {subtitle ? (
            <p className="text-[12px] text-text-secondary">{subtitle}</p>
          ) : null}
        </div>

        {count !== undefined && count > 0 ? (
          <span className="grid size-[24px] shrink-0 place-items-center rounded-pill bg-g-200 text-[11.5px] font-normal text-text-primary">
            {count}
          </span>
        ) : null}

        {seeAllHref ? (
          <Link
            href={seeAllHref}
            className="flex shrink-0 items-center gap-1 rounded-sm text-[12px] font-normal text-text-primary transition-opacity duration-150 hover:opacity-60 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
          >
            {DASHBOARD_COPY.seeAll}
            <ChevronRight size={13} strokeWidth={1.5} aria-hidden />
          </Link>
        ) : null}
      </header>

      <div className="h-px bg-border" />

      {isEmpty ? (
        <p className="px-5 py-8 text-center text-[12px] text-text-muted">
          {emptyText}
        </p>
      ) : (
        children
      )}
    </section>
  );
}
