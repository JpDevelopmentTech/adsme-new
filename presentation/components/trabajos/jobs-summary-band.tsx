import { JOBS_BAND_COPY } from "@/constants/jobs.constants";
import { PortfolioFigure } from "@/presentation/components/clientes/portfolio-figure";
import type { JobsSummaryBandProps } from "@/types/jobs-list.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Cabecera del listado: cuánto dinero hay comprometido y en qué estado está la
 * pauta. Los puntos usan el mismo color que los tramos de la línea de tiempo y
 * solo aparecen las cifras que no son cero.
 */
export function JobsSummaryBand({ summary }: JobsSummaryBandProps) {
  const composition = [
    { value: summary.running, label: JOBS_BAND_COPY.runningLabel, dot: "bg-success" },
    { value: summary.endingSoon, label: JOBS_BAND_COPY.endingSoonLabel, dot: "bg-warning" },
    { value: summary.overdue, label: JOBS_BAND_COPY.overdueLabel, dot: "bg-danger" },
    { value: summary.upcoming, label: JOBS_BAND_COPY.upcomingLabel, dot: "bg-text-secondary" },
    { value: summary.finished, label: JOBS_BAND_COPY.finishedLabel, dot: "bg-lilac" },
  ].filter((figure) => figure.value > 0);

  return (
    <section className="glass-panel flex flex-col gap-7 rounded-card px-7 py-[26px] xl:flex-row xl:items-center xl:gap-8">
      <div className="flex flex-col gap-1.5 xl:w-[330px] xl:shrink-0">
        <p className="flex items-center gap-2 text-[13px] font-normal text-text-secondary">
          <span aria-hidden className="size-2 rounded-pill bg-lilac" />
          {JOBS_BAND_COPY.eyebrow}
        </p>
        <p className="text-5xl leading-[1.05] font-extralight tracking-[-1.5px] text-text-primary tabular-nums">
          {formatCompactCurrency(summary.invested)}
        </p>
        <p className="text-sm text-text-secondary">{JOBS_BAND_COPY.committed(summary.total)}</p>
      </div>

      <ul className="flex flex-1 flex-wrap items-start gap-y-4">
        {composition.map((figure) => (
          <PortfolioFigure key={figure.label} {...figure} />
        ))}
      </ul>
    </section>
  );
}
