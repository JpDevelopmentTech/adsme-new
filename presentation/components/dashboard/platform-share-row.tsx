import { PLATFORM_LABELS } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import type { PlatformShareRowProps } from "@/types/dashboard-home.types";
import { cn } from "@/utils/cn";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatPercent } from "@/utils/format-compact-number";
import { formatPlatformStatus } from "@/utils/format-platform-status";

/** Una plataforma: cuánto se lleva del mes y en qué estado está su conexión. */
export function PlatformShareRow({ share }: PlatformShareRowProps) {
  const { chartColor, Icon } = PLATFORM_META[share.platform];
  const status = formatPlatformStatus(share);

  return (
    <li className="flex flex-col gap-2">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="grid size-[30px] shrink-0 place-items-center rounded-sm"
          style={{ backgroundColor: `${chartColor}1F`, color: chartColor }}
        >
          <Icon />
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-[13.5px] font-semibold text-text-primary">
            {PLATFORM_LABELS[share.platform]}
          </span>
          <span
            className={cn(
              "truncate text-[11.5px]",
              status.isWarning ? "text-warning" : "text-text-muted",
            )}
          >
            {status.label}
          </span>
        </span>

        <span className="flex shrink-0 flex-col items-end gap-0.5">
          <span className="text-[13.5px] font-semibold text-text-primary">
            {formatCompactCurrency(share.amount)}
          </span>
          <span className="text-[11.5px] text-text-secondary">
            {formatPercent(share.percent)}
          </span>
        </span>
      </div>

      <div aria-hidden className="h-[5px] w-full rounded-pill bg-surface">
        <div
          className="h-full rounded-pill"
          style={{ width: `${share.percent}%`, backgroundColor: chartColor }}
        />
      </div>
    </li>
  );
}
