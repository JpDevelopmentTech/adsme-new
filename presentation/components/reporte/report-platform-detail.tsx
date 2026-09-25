import { PLATFORM_LABELS } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportStatCard } from "@/presentation/components/reporte/report-stat-card";
import type { ReportPlatformDetailProps } from "@/types/report.types";
import { buildPlatformStats } from "@/utils/build-platform-stats";

/**
 * Todo lo que una plataforma reportó, un dato por tarjeta.
 *
 * Cada bloque trae tantas tarjetas como métricas entregue su cuenta —Meta las
 * ocho, YouTube cuatro—, y esa diferencia de tamaño es justo lo que evita que
 * tres bloques seguidos se lean como la misma sección repetida tres veces.
 */
export function ReportPlatformDetail({ metrics }: ReportPlatformDetailProps) {
  const { chartColor } = PLATFORM_META[metrics.platform];
  const stats = buildPlatformStats(metrics);

  if (stats.length === 0) return null;

  return (
    <section className="flex flex-col gap-3.5">
      <header className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="h-[18px] w-1 shrink-0 rounded-pill"
          style={{ backgroundColor: chartColor }}
        />
        <h3 className="text-[13.5px] font-normal text-text-primary">
          {PLATFORM_LABELS[metrics.platform]}
        </h3>
        <span className="text-[11.5px] text-text-muted">
          {REPORT_COPY.detailCampaigns(metrics.campaigns)}
        </span>
      </header>

      {/* `auto-fill` y no `auto-fit`: con `auto-fit` las columnas sobrantes se
          reparten el ancho, así que un bloque de cinco tarjetas las pintaría
          más anchas que uno de nueve y el mismo dato cambiaría de tamaño según
          la plataforma. Con `auto-fill` la rejilla es la misma para todos. */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-2.5">
        {stats.map((stat) => (
          <ReportStatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
