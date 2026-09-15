import type { PacingRailProps } from "@/types/dashboard-home.types";
import { cn } from "@/utils/cn";
import { formatPacing } from "@/utils/format-pacing";

/**
 * Ritmo de gasto del mes: el relleno es la parte del plan que cae hasta hoy y
 * la muesca, el punto en el que va el calendario. Verlos separados dice de un
 * vistazo si la inversión está adelantada o atrasada.
 */
export function PacingRail({
  spendPercent,
  calendarPercent,
  caption,
}: PacingRailProps) {
  const spent = Math.min(100, spendPercent);
  const calendar = Math.min(100, calendarPercent);
  // La muesca se recorta sobre el tramo gastado; cuando el gasto va por detrás
  // cae sobre el riel vacío, donde un tono oscuro sería invisible.
  const isOverSpent = spent >= calendar;

  return (
    <div className="flex flex-col gap-[9px]">
      <div aria-hidden className="relative h-2 w-full rounded-pill bg-white/15">
        <div
          className="h-full rounded-pill bg-accent-bright"
          style={{ width: `${spent}%` }}
        />
        <span
          className={cn(
            "absolute top-0 h-2 w-0.5",
            isOverSpent ? "bg-ink/70" : "bg-g-50/80",
          )}
          style={{ left: `${calendar}%` }}
        />
      </div>

      <p className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="flex flex-wrap items-center gap-x-1.5">
          <span className="text-[12.5px] font-normal text-g-50">
            {Math.round(spendPercent)}% del plan gastado
          </span>
          <span className="text-[12.5px] text-g-400">
            · {formatPacing(spendPercent, calendarPercent)}
          </span>
        </span>
        <span className="text-[11.5px] text-g-400">{caption}</span>
      </p>
    </div>
  );
}
