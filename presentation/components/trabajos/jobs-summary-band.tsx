import { Plus } from "lucide-react";
import { JOBS_BAND_COPY, JOBS_COPY } from "@/constants/jobs.constants";
import { NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import type { JobsSummaryBandProps } from "@/types/jobs-list.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Cabecera del listado: cuánto dinero hay comprometido y en qué estado está la
 * pauta. Los puntos usan el mismo código de color que los tramos de la línea de
 * tiempo, así el resumen y el detalle se leen igual.
 */
export function JobsSummaryBand({ summary }: JobsSummaryBandProps) {
  const composition = [
    { count: summary.running, label: JOBS_BAND_COPY.running, dot: "bg-ink" },
    {
      count: summary.endingSoon,
      label: JOBS_BAND_COPY.endingSoon,
      dot: "bg-warning",
    },
    { count: summary.overdue, label: JOBS_BAND_COPY.overdue, dot: "bg-accent" },
    { count: summary.upcoming, label: JOBS_BAND_COPY.upcoming, dot: "bg-g-400" },
    { count: summary.finished, label: JOBS_BAND_COPY.finished, dot: "bg-g-500" },
  ].filter((item) => item.count > 0);

  return (
    <section className="glass-panel flex flex-wrap items-center gap-6 rounded-card px-6 py-[22px]">
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
          {JOBS_BAND_COPY.eyebrow}
        </span>

        <p className="flex flex-wrap items-end gap-x-2.5">
          <span className="font-display text-[30px] leading-none font-light tracking-[-1.2px] text-text-primary">
            {formatCompactCurrency(summary.invested)}
          </span>
          <span className="text-[13px] text-text-secondary">
            {JOBS_BAND_COPY.committed(summary.total)}
          </span>
        </p>

        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {composition.map((item) => (
            <li
              key={item.dot}
              className="flex items-center gap-[7px] text-[12px] text-text-secondary"
            >
              <span aria-hidden className={`size-[7px] rounded-pill ${item.dot}`} />
              {item.label(item.count)}
            </li>
          ))}
        </ul>
      </div>

      <PrimaryLink href={NEW_JOB_ROUTE}>
        <Plus size={15} strokeWidth={1.75} aria-hidden />
        {JOBS_COPY.newJob}
      </PrimaryLink>
    </section>
  );
}
