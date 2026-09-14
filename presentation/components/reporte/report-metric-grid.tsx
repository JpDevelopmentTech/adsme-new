import { ReportMetricCard } from "@/presentation/components/reporte/report-metric-card";
import type { ReportMetricGridProps } from "@/types/report.types";

/**
 * Rejilla de tarjetas. Se reparte sola para que las cuatro de la portada, las
 * siete de Meta o las cinco de TikTok caigan sin filas cosidas a mano.
 */
export function ReportMetricGrid({ metrics }: ReportMetricGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(215px,1fr))] gap-5">
      {metrics.map((metric) => (
        <ReportMetricCard key={metric.label} metric={metric} />
      ))}
    </div>
  );
}
