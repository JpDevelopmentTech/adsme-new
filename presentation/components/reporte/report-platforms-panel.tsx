import { REPORT_COPY } from "@/constants/report.constants";
import { ReportPanelHeader } from "@/presentation/components/reporte/report-panel-header";
import { ReportPlatformColumn } from "@/presentation/components/reporte/report-platform-column";
import { ReportPlatformTabs } from "@/presentation/components/reporte/report-platform-tabs";
import type { ReportPlatformsPanelProps } from "@/types/report.types";
import { cn } from "@/utils/cn";

/**
 * Las plataformas, una al lado de otra: comparar dónde funcionó mejor el
 * lanzamiento —que es la pregunta del artista— se hace de un vistazo.
 */
export function ReportPlatformsPanel({
  platforms,
  activePlatform,
  basePath,
  params,
  showSpend,
}: ReportPlatformsPanelProps) {
  const totalPlays = platforms.reduce((sum, metrics) => sum + metrics.videoPlays, 0);
  const visible = activePlatform
    ? platforms.filter((metrics) => metrics.platform === activePlatform)
    : platforms;

  if (totalPlays === 0) return null;

  return (
    <section className="glass-thick flex flex-col gap-6 rounded-window p-5 sm:p-7">
      <ReportPanelHeader
        title={REPORT_COPY.platformsTitle}
        subtitle={REPORT_COPY.platformsSubtitle}
        aside={
          <ReportPlatformTabs
            platforms={platforms.map((metrics) => metrics.platform)}
            activePlatform={activePlatform}
            basePath={basePath}
            params={params}
          />
        }
      />

      <ul className={cn("grid gap-4", visible.length > 1 && "md:grid-cols-3")}>
        {visible.map((metrics) => (
          <ReportPlatformColumn
            key={metrics.platform}
            metrics={metrics}
            totalPlays={totalPlays}
            showSpend={showSpend}
          />
        ))}
      </ul>
    </section>
  );
}
