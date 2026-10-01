import { REPORT_COPY } from "@/constants/report.constants";
import { GrowthLegend } from "@/presentation/components/reporte/growth-legend";
import { ReportGrowthChart } from "@/presentation/components/reporte/report-growth-chart";
import { ReportPanelHeader } from "@/presentation/components/reporte/report-panel-header";
import type { ReportGrowthPanelProps } from "@/types/report.types";

/**
 * Cómo fue creciendo el lanzamiento. Una sola gráfica con las tres plataformas
 * sobre el mismo eje, cada una con su trazado: así se ve de un vistazo cuál
 * tiró y en qué días.
 */
export function ReportGrowthPanel({ growth, period }: ReportGrowthPanelProps) {
  const label = REPORT_COPY.growthSubtitle(period);

  return (
    <section className="glass-thick flex flex-col gap-[22px] rounded-window p-5 sm:p-7">
      <ReportPanelHeader
        title={REPORT_COPY.growthTitle}
        subtitle={label}
        aside={<GrowthLegend totals={growth.totals} />}
      />

      <ReportGrowthChart growth={growth} label={label} />
    </section>
  );
}
