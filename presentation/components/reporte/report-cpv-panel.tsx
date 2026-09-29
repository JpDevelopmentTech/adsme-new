import { CPV_COMPARISON_COPY } from "@/constants/cpv-comparison.constants";
import { ReportCpvChart } from "@/presentation/components/reporte/report-cpv-chart";
import { ReportCpvLegend } from "@/presentation/components/reporte/report-cpv-legend";
import type { ReportCpvPanelProps } from "@/types/report.types";
import { buildCpvHeadline } from "@/utils/build-cpv-headline";
import { buildCpvStats } from "@/utils/build-cpv-stats";
import { formatExactNumber } from "@/utils/format-exact-number";

/**
 * Lo que el presupuesto de YouTube prometía en vistas frente a lo que entregó.
 * Abre con el titular —cuánto por encima o por debajo— porque es lo que el
 * artista viene a saber; las cifras y la gráfica son la prueba.
 */
export function ReportCpvPanel({
  comparison,
  period,
  showSpend,
}: ReportCpvPanelProps) {
  const stats = buildCpvStats(comparison, showSpend);
  const label = CPV_COMPARISON_COPY.chartLabel(
    formatExactNumber(comparison.plannedViews),
    formatExactNumber(comparison.actualToDate),
  );

  return (
    <section className="glass-panel flex flex-col gap-[18px] rounded-card p-[22px]">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {CPV_COMPARISON_COPY.title}
          </h2>
          <p className="text-[12px] text-text-secondary">
            {CPV_COMPARISON_COPY.subtitle(period)}
          </p>
        </div>
        <ReportCpvLegend />
      </header>

      <p className="font-display text-[22px] leading-[1.2] font-light tracking-[-0.6px] text-balance text-text-primary">
        {buildCpvHeadline(comparison)}
      </p>

      <dl className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-field flex flex-col gap-1 rounded-tile px-4 py-3.5">
            <dt className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
              {stat.label}
            </dt>
            <dd className="font-display text-[22px] leading-none font-light tracking-[-0.6px] text-text-primary">
              {stat.value}
            </dd>
            <dd className="text-[11.5px] text-text-secondary">{stat.note}</dd>
          </div>
        ))}
      </dl>

      <ReportCpvChart days={comparison.days} label={label} />
    </section>
  );
}
