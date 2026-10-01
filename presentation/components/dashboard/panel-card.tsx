import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import type { PanelCardProps } from "@/types/dashboard-home.types";

/**
 * Panel de vidrio grueso con cabecera y filas separadas por filete: el material
 * casi opaco es para lo que se lee en filas, como las tablas.
 */
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
    <section className="glass-thick flex h-full flex-col overflow-hidden rounded-card">
      <header className="flex items-start justify-between gap-3 px-6 pt-6 pb-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="flex items-center gap-2.5 text-[17px] font-light text-text-primary">
            {icon}
            {title}
          </h2>
          {subtitle ? <p className="text-xs font-normal text-text-muted">{subtitle}</p> : null}
        </div>

        {count !== undefined && count > 0 ? (
          <span className="rounded-pill bg-surface px-2.5 py-0.5 text-xs font-medium text-text-secondary">
            {count}
          </span>
        ) : null}

        {seeAllHref ? (
          <Link
            href={seeAllHref}
            className="flex shrink-0 items-center gap-1 rounded-sm pt-1 text-[13px] font-normal text-text-secondary transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
          >
            {DASHBOARD_COPY.seeAll}
            <ChevronRight size={14} strokeWidth={1.5} aria-hidden />
          </Link>
        ) : null}
      </header>

      {isEmpty ? (
        <p className="px-6 pb-8 text-center text-[13px] text-text-muted">{emptyText}</p>
      ) : (
        children
      )}
    </section>
  );
}
