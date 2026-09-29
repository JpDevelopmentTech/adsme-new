import type { PacingRailProps } from "@/types/dashboard-home.types";
import { formatPacing } from "@/utils/format-pacing";

/**
 * Ritmo de gasto del mes, el elemento que abre el dashboard: el trazo en tinta
 * es la parte del plan que cae hasta hoy y la marca salvia, dónde va el
 * calendario. Si el trazo pasa la marca, la inversión va adelantada.
 */
export function PacingRail({
  spendPercent,
  calendarPercent,
  caption,
}: PacingRailProps) {
  const spent = Math.min(100, spendPercent);
  const calendar = Math.min(100, calendarPercent);

  return (
    <div className="flex flex-col gap-2.5">
      <div aria-hidden className="relative h-4">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-pill bg-g-300" />
        <div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-pill bg-ink"
          style={{ width: `${spent}%` }}
        />
        <span
          className="absolute top-0 h-4 w-0.5 -translate-x-1/2 rounded-pill bg-accent-bright"
          style={{ left: `${calendar}%` }}
        />
      </div>

      <p className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="flex flex-wrap items-center gap-x-1.5">
          <span className="text-[13px] font-normal text-text-primary">
            {Math.round(spendPercent)}% del plan gastado
          </span>
          <span className="text-[13px] text-text-secondary">
            · {formatPacing(spendPercent, calendarPercent)}
          </span>
        </span>
        <span className="text-[12px] text-text-muted">{caption}</span>
      </p>
    </div>
  );
}
