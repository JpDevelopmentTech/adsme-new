import type { PacingRailProps } from "@/types/dashboard-home.types";
import { formatPacing } from "@/utils/format-pacing";

/**
 * Ritmo de gasto del mes: el relleno es la parte del plan que cae hasta hoy y
 * la marca, el punto en el que va el calendario. Verlos separados dice de un
 * vistazo si la inversión está adelantada o atrasada.
 */
export function PacingRail({
  spendPercent,
  calendarPercent,
  caption,
}: PacingRailProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div aria-hidden className="relative h-1.5 w-full rounded-pill bg-surface">
        <div
          className="h-full rounded-pill bg-brand-violet"
          style={{ width: `${Math.min(100, spendPercent)}%` }}
        />
        <span
          className="absolute -top-[3px] h-3 w-0.5 rounded-[1px] bg-text-secondary"
          style={{ left: `${Math.min(100, calendarPercent)}%` }}
        />
      </div>

      <p className="flex flex-wrap items-center gap-x-1.5 text-[11.5px]">
        <span className="font-semibold text-brand-violet">
          {Math.round(spendPercent)}% del plan hasta hoy
        </span>
        <span className="text-text-muted">
          · {formatPacing(spendPercent, calendarPercent)} · {caption}
        </span>
      </p>
    </div>
  );
}
