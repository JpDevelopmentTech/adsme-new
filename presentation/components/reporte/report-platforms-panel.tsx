import { Fragment } from "react";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportPlatformColumn } from "@/presentation/components/reporte/report-platform-column";
import { ReportPlatformTabs } from "@/presentation/components/reporte/report-platform-tabs";
import type { ReportPlatformsPanelProps } from "@/types/report.types";

/**
 * Las plataformas, una al lado de otra. Antes era una sección por plataforma,
 * separadas por pantallas de scroll: comparar dónde funcionó mejor el
 * lanzamiento —que es la pregunta del artista— obligaba a hacerlo de memoria.
 */
export function ReportPlatformsPanel({
  platforms,
  activePlatform,
  basePath,
}: ReportPlatformsPanelProps) {
  const totalPlays = platforms.reduce(
    (sum, metrics) => sum + metrics.videoPlays,
    0,
  );
  const visible = activePlatform
    ? platforms.filter((metrics) => metrics.platform === activePlatform)
    : platforms;

  if (totalPlays === 0) return null;

  return (
    <section className="glass-panel flex flex-col overflow-hidden rounded-card">
      <header className="flex flex-wrap items-center justify-between gap-4 px-[22px] py-[15px]">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {REPORT_COPY.platformsTitle}
          </h2>
          <p className="text-[12px] text-text-secondary">
            {REPORT_COPY.platformsSubtitle}
          </p>
        </div>

        <ReportPlatformTabs
          platforms={platforms.map((metrics) => metrics.platform)}
          activePlatform={activePlatform}
          basePath={basePath}
        />
      </header>

      <div className="h-px bg-border/60" />

      <ul className="flex flex-wrap items-start gap-y-6 py-[18px]">
        {visible.map((metrics, index) => (
          <Fragment key={metrics.platform}>
            {index > 0 ? (
              <span aria-hidden className="hidden h-[104px] w-px bg-border/60 lg:block" />
            ) : null}
            <ReportPlatformColumn metrics={metrics} totalPlays={totalPlays} />
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
