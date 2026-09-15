import { REPORT_COPY } from "@/constants/report.constants";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";
import { ShareReportButton } from "@/presentation/components/reporte/share-report-button";
import type { ReportTopbarProps } from "@/types/report.types";
import { formatRelativeTime } from "@/utils/format-relative-time";

/**
 * Barra superior del reporte: marca, lanzamiento y estado de los datos. El
 * filtro por plataforma ya no vive aquí sino junto a las cifras que filtra.
 */
export function ReportTopbar({
  subtitle,
  syncedAt,
  now,
  reportUrl,
}: ReportTopbarProps) {
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/70 bg-g-50/85 px-6 py-3.5 backdrop-blur-md lg:px-10">
      <div className="flex min-w-0 items-center gap-3.5">
        <BrandWordmark className="h-5" />
        <span aria-hidden className="h-[18px] w-px bg-border" />
        <p className="truncate text-[12.5px] text-text-secondary">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <p className="flex items-center gap-[7px] text-[11.5px] text-text-secondary">
          <span
            aria-hidden
            className={`size-[7px] rounded-pill ${syncedAt ? "bg-success" : "bg-g-400"}`}
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
