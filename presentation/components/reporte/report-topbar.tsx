import { REPORT_COPY } from "@/constants/report.constants";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";
import { ReportPlatformTabs } from "@/presentation/components/reporte/report-platform-tabs";
import { ShareReportButton } from "@/presentation/components/reporte/share-report-button";
import type { ReportTopbarProps } from "@/types/report.types";
import { formatRelativeTime } from "@/utils/format-relative-time";

/** Barra superior del reporte: marca, lanzamiento, filtro y estado de los datos. */
export function ReportTopbar({
  subtitle,
  platforms,
  activePlatform,
  basePath,
  syncedAt,
  now,
  reportUrl,
}: ReportTopbarProps) {
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-canvas/85 px-6 py-4 backdrop-blur-md lg:px-10">
      <div className="flex items-center gap-4">
        <BrandWordmark />
        <span aria-hidden className="h-6 w-px bg-border" />
        <p className="text-[13px] text-text-secondary">{subtitle}</p>
      </div>

      <ReportPlatformTabs
        platforms={platforms}
        activePlatform={activePlatform}
        basePath={basePath}
      />

      <div className="flex items-center gap-5">
        <p className="flex items-center gap-2 text-xs text-text-muted">
          <span
            aria-hidden
            className={`size-[7px] rounded-full ${syncedAt ? "bg-success" : "bg-text-muted"}`}
          />
          {syncedAt
            ? REPORT_COPY.updated(formatRelativeTime(syncedAt, now))
            : REPORT_COPY.neverSynced}
        </p>

        <ShareReportButton url={reportUrl} label={REPORT_COPY.share} />
      </div>
    </header>
  );
}
