import { REPORT_COPY } from "@/constants/report.constants";
import { ReportPlatformDetail } from "@/presentation/components/reporte/report-platform-detail";
import type { ReportPlatformDetailsProps } from "@/types/report.types";

/**
 * El detalle del lanzamiento, plataforma por plataforma. Va después de la
 * comparación porque responde a la pregunta siguiente: primero dónde funcionó
 * mejor, y solo entonces cuánto exactamente hizo cada una.
 *
 * Las plataformas sin campañas vinculadas no aparecen: en la comparación tienen
 * sentido —dicen que esa pauta no se contrató—, pero aquí serían un bloque
 * vacío. Y respeta las pestañas del panel de arriba, que filtran el reporte
 * entero y no solo aquel panel.
 */
export function ReportPlatformDetails({
  platforms,
  activePlatform,
}: ReportPlatformDetailsProps) {
  const visible = platforms.filter(
    (metrics) =>
      metrics.campaigns > 0 &&
      (!activePlatform || metrics.platform === activePlatform),
  );

  if (visible.length === 0) return null;

  return (
    <section className="glass-panel flex flex-col gap-6 rounded-card px-[22px] py-5">
      <div className="flex flex-col gap-[3px]">
        <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
          {REPORT_COPY.detailTitle}
        </h2>
        <p className="text-[12px] text-text-secondary">
          {REPORT_COPY.detailSubtitle}
        </p>
      </div>

      {visible.map((metrics) => (
        <ReportPlatformDetail key={metrics.platform} metrics={metrics} />
      ))}
    </section>
  );
}
