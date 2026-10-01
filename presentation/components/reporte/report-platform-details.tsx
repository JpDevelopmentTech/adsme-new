import { Fragment } from "react";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportPanelHeader } from "@/presentation/components/reporte/report-panel-header";
import { ReportPlatformDetail } from "@/presentation/components/reporte/report-platform-detail";
import type { ReportPlatformDetailsProps } from "@/types/report.types";

/**
 * El detalle del lanzamiento, plataforma por plataforma. Va después de la
 * comparación porque responde a la pregunta siguiente: primero dónde funcionó
 * mejor, y solo entonces cuánto exactamente hizo cada una.
 *
 * Las plataformas sin campañas vinculadas no aparecen: aquí serían un bloque
 * vacío. Y respeta las pestañas del panel de arriba.
 */
export function ReportPlatformDetails({ platforms, activePlatform, showSpend }: ReportPlatformDetailsProps) {
  const visible = platforms.filter(
    (metrics) => metrics.campaigns > 0 && (!activePlatform || metrics.platform === activePlatform),
  );

  if (visible.length === 0) return null;

  return (
    <section className="glass-thick flex flex-col gap-6 rounded-window p-5 sm:p-7">
      <ReportPanelHeader title={REPORT_COPY.detailTitle} subtitle={REPORT_COPY.detailSubtitle} />

      {visible.map((metrics, index) => (
        <Fragment key={metrics.platform}>
          {index > 0 ? <span aria-hidden className="h-px bg-border" /> : null}
          <ReportPlatformDetail metrics={metrics} showSpend={showSpend} />
        </Fragment>
      ))}
    </section>
  );
}
