import { CPV_COMPARISON_COPY } from "@/constants/cpv-comparison.constants";
import { ReportCpvChart } from "@/presentation/components/reporte/report-cpv-chart";
import { ReportCpvLegend } from "@/presentation/components/reporte/report-cpv-legend";
import { ReportPanelHeader } from "@/presentation/components/reporte/report-panel-header";
import type { ReportCpvPanelProps } from "@/types/report.types";
import { buildCpvHeadline } from "@/utils/build-cpv-headline";
import { buildCpvStats } from "@/utils/build-cpv-stats";
import { formatExactNumber } from "@/utils/format-exact-number";

/**
 * Lo que el presupuesto de YouTube prometía en vistas frente a lo que entregó.
 * Abre con el titular —cuánto por encima o por debajo— porque es lo que el
 * artista viene a saber; las cifras y la gráfica son la prueba.
 */
export function ReportCpvPanel({ comparison, period, showSpend }: ReportCpvPanelProps) {
  const stats = buildCpvStats(comparison, showSpend);
  const label = CPV_COMPARISON_COPY.chartLabel(
    formatExactNumber(comparison.plannedViews),
    formatExactNumber(comparison.actualToDate),
  );

  return (
    <section className="glass-thick flex flex-col gap-[22px] rounded-window p-5 sm:p-7">
      <ReportPanelHeader
        title={CPV_COMPARISON_COPY.title}
        subtitle={CPV_COMPARISON_COPY.subtitle(period)}
        aside={<ReportCpvLegend />}
      />

      <p className="text-[clamp(22px,3vw,30px)] leading-[1.2] font-extralight tracking-[-0.6px] text-balance text-text-primary">
        {buildCpvHeadline(comparison)}
      </p>

      <dl className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5 rounded-tile border border-border bg-surface px-[18px] py-4">
            <dt className="text-xs font-normal text-text-muted">{stat.label}</dt>
            <dd className="text-[32px] leading-none font-extralight text-text-primary tabular-nums">{stat.value}</dd>
            <dd className="text-xs font-normal text-text-secondary">{stat.note}</dd>
          </div>
        ))}
      </dl>

      <ReportCpvChart days={comparison.days} label={label} />
    </section>
  );
}
