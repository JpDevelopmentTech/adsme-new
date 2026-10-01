import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import type { ReportPlatformColumnProps } from "@/types/report.types";
import { cn } from "@/utils/cn";
import { formatPercent, share } from "@/utils/format-compact-number";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";

/**
 * Una plataforma dentro de la comparación: cuánto aportó y con qué esfuerzo.
 * La que no entregó nada se atenúa en lugar de esconderse: dice que esa pauta
 * no se movió, que también es información.
 */
export function ReportPlatformColumn({ metrics, totalPlays, showSpend }: ReportPlatformColumnProps) {
  const { chartColor, label } = PLATFORM_META[metrics.platform];
  const percent = share(metrics.videoPlays, totalPlays);

  return (
    <li
      className={cn(
        "flex min-w-0 flex-col gap-3.5 rounded-[20px] border border-border bg-surface p-[22px]",
        metrics.videoPlays === 0 && "opacity-60",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2">
          <span aria-hidden className="size-[9px] shrink-0 rounded-pill" style={{ backgroundColor: chartColor }} />
          <span className="truncate text-[15px] text-text-primary">{label}</span>
        </span>
        <span className="text-[15px] text-text-secondary tabular-nums">{formatPercent(percent)}</span>
      </div>

      <span className="text-[40px] leading-none font-extralight tracking-[-1px] text-text-primary tabular-nums">
        {formatExactNumber(metrics.videoPlays)}
      </span>

      <div aria-hidden className="h-2 w-full rounded-pill bg-white/8">
        <div className="h-full rounded-pill" style={{ width: `${percent}%`, backgroundColor: chartColor }} />
      </div>

      <span className="text-xs text-text-muted">
        {showSpend
          ? REPORT_COPY.platformFoot(metrics.campaigns, formatExactCurrency(metrics.spend))
          : REPORT_COPY.detailCampaigns(metrics.campaigns)}
      </span>
    </li>
  );
}
