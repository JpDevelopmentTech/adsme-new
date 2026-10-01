import { REPORT_COPY } from "@/constants/report.constants";
import { BrandWordmark } from "@/presentation/components/brand/brand-wordmark";
import { ShareReportButton } from "@/presentation/components/reporte/share-report-button";
import type { ReportTopbarProps } from "@/types/report.types";
import { cn } from "@/utils/cn";
import { formatRelativeTime } from "@/utils/format-relative-time";

/**
 * Barra superior del reporte: una píldora de vidrio con la marca, de qué
 * lanzamiento es y cuándo se actualizó. Se queda fija al desplazarse para que
 * «Compartir» esté siempre a mano. Sin `syncedAt` no hay estado que contar.
 */
export function ReportTopbar({ subtitle, syncedAt, now, reportUrl, showStatus = true }: ReportTopbarProps) {
  return (
    <header className="sticky top-3 z-20 flex h-[60px] items-center gap-4 rounded-pill border border-border bg-[#0e091a66] pr-2.5 pl-6 backdrop-blur-[30px]">
      <BrandWordmark className="h-[23px] shrink-0" />
      <span aria-hidden className="hidden h-[22px] w-px shrink-0 bg-border-strong sm:block" />
      <p className="hidden min-w-0 flex-1 truncate text-sm text-text-secondary sm:block">{subtitle}</p>

      {showStatus ? (
        <p className="ml-auto hidden shrink-0 items-center gap-2 text-[13px] text-text-secondary md:flex">
          <span aria-hidden className={cn("size-[7px] rounded-pill", syncedAt ? "bg-success" : "bg-text-muted")} />
          {syncedAt ? REPORT_COPY.updated(formatRelativeTime(syncedAt, now)) : REPORT_COPY.neverSynced}
        </p>
      ) : null}

      <div className="ml-auto md:ml-0">
        <ShareReportButton url={reportUrl} label={REPORT_COPY.share} />
      </div>
    </header>
  );
}
