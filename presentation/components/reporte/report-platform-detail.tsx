import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportStatCard } from "@/presentation/components/reporte/report-stat-card";
import type { ReportPlatformDetailProps } from "@/types/report.types";
import { buildPlatformStats } from "@/utils/build-platform-stats";

/**
 * Todo lo que una plataforma reportó, un dato por tarjeta y tres por fila.
 * Cada bloque trae tantas tarjetas como métricas entregue su cuenta, y esa
 * diferencia de tamaño evita que los bloques se lean como uno repetido.
 */
export function ReportPlatformDetail({ metrics, showSpend }: ReportPlatformDetailProps) {
  const { chartColor, label } = PLATFORM_META[metrics.platform];
  const stats = buildPlatformStats(metrics, showSpend);

  if (stats.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-center gap-2.5">
        <span aria-hidden className="size-[9px] shrink-0 rounded-pill" style={{ backgroundColor: chartColor }} />
        <h3 className="text-[17px] text-text-primary">{label}</h3>
        <span className="text-[13px] font-light text-text-muted">{REPORT_COPY.detailCampaigns(metrics.campaigns)}</span>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <ReportStatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
