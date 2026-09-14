import { Search } from "lucide-react";
import { REPORT_COPY } from "@/constants/report.constants";
import { SampleDataBadge } from "@/presentation/components/reporte/sample-data-badge";
import type { ReportKeywordsCardProps } from "@/types/report.types";

/** Búsquedas que más llevaron a la pauta, ordenadas por volumen. */
export function ReportKeywordsCard({ keywords }: ReportKeywordsCardProps) {
  return (
    <section className="flex flex-col gap-5 rounded-card border border-border bg-card p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-text-primary">
          <Search size={17} className="text-brand-violet" aria-hidden />
          {REPORT_COPY.keywordsTitle}
        </h2>
        <SampleDataBadge />
      </header>

      <ol className="flex flex-col">
        {keywords.map((keyword, index) => (
          <li
            key={keyword.term}
            className="flex items-center gap-3.5 border-b border-border py-3 last:border-b-0 last:pb-0 first:pt-0"
          >
            <span className="grid size-[26px] shrink-0 place-items-center rounded-sm bg-card-elevated font-display text-xs font-bold text-text-muted">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] text-text-primary">
              {keyword.term}
            </span>
            <span className="shrink-0 text-[13px] font-semibold text-text-secondary">
              {keyword.volume}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
