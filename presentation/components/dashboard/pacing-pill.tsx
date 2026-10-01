import { PACING_PILL_STYLES } from "@/constants/pacing.constants";
import type { PacingPillProps } from "@/types/dashboard-home.types";
import { cn } from "@/utils/cn";
import { formatPacing } from "@/utils/format-pacing";
import { getPacingDirection } from "@/utils/get-pacing-direction";

/** Pastilla que dice en palabras si el gasto va por delante o por detrás del período. */
export function PacingPill({ spendPercent, calendarPercent }: PacingPillProps) {
  const style = PACING_PILL_STYLES[getPacingDirection(spendPercent, calendarPercent)];
  const Icon = style.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 self-start rounded-pill px-2.5 py-[5px] text-xs font-normal",
        style.classes,
      )}
    >
      <Icon size={14} strokeWidth={1.75} aria-hidden />
      {formatPacing(spendPercent, calendarPercent)}
    </span>
  );
}
