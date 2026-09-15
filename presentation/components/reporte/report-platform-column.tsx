import { PLATFORM_LABELS } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import type { ReportPlatformColumnProps } from "@/types/report.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatCompactNumber, formatPercent, share } from "@/utils/format-compact-number";

/** Una plataforma dentro de la comparación: cuánto aportó y con qué esfuerzo. */
export function ReportPlatformColumn({
  metrics,
  totalPlays,
}: ReportPlatformColumnProps) {
  const { chartColor } = PLATFORM_META[metrics.platform];
  const percent = share(metrics.videoPlays, totalPlays);

  return (
    <li className="flex min-w-[240px] flex-1 flex-col gap-[11px] px-[22px]">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="h-6 w-1 shrink-0 rounded-pill"
          style={{ backgroundColor: chartColor }}
        />
        <span className="min-w-0 flex-1 truncate text-[13.5px] font-normal text-text-primary">
          {PLATFORM_LABELS[metrics.platform]}
        </span>
        <span className="text-[13.5px] font-normal text-text-secondary">
          {formatPercent(percent)}
        </span>
      </div>

      <span className="font-display text-[30px] leading-none font-light tracking-[-1.1px] text-text-primary">
        {formatCompactNumber(metrics.videoPlays)}
      </span>

      <div aria-hidden className="h-1.5 w-full rounded-pill bg-g-200">
        <div
          className="h-full rounded-pill"
          style={{ width: `${percent}%`, backgroundColor: chartColor }}
        />
      </div>

      <span className="text-[11.5px] text-text-muted">
        {REPORT_COPY.platformFoot(
          metrics.campaigns,
          formatCompactCurrency(metrics.spend),
        )}
      </span>
    </li>
  );
}
