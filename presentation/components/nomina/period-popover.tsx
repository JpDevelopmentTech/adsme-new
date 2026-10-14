import { ChevronLeft, ChevronRight } from "lucide-react";
import { DEFAULT_PERIOD, PERIOD_HELP, PERIOD_MONTHS, PERIOD_QUARTERS, PERIOD_SHORTCUTS } from "@/constants/nomina-period.constants";
import { cn } from "@/utils/cn";

/**
 * Contenido del selector de periodo: atajos a la izquierda y, a la derecha, el
 * año con sus trimestres y la rejilla de meses con el rango marcado.
 */
export function PeriodPopover() {
  const { fromIndex, toIndex, year, label } = DEFAULT_PERIOD;

  return (
    <div className="glass-menu flex w-[min(600px,calc(100vw-2rem))] gap-[18px] rounded-[20px] p-4 max-sm:flex-col">
      <ul className="flex w-[170px] shrink-0 flex-col gap-0.5 border-border pr-3.5 max-sm:w-full sm:border-r">
        <li className="pb-1 text-[10px] tracking-[1.2px] text-text-muted uppercase">Atajos</li>
        {PERIOD_SHORTCUTS.map((shortcut) => (
          <li key={shortcut}>
            <button type="button" className={cn("w-full cursor-pointer rounded-sm px-2.5 py-2 text-left text-[13px]", shortcut === label ? "bg-lilac/12 font-normal text-lilac" : "text-text-secondary hover:bg-surface")}>
              {shortcut}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between">
          <button type="button" aria-label="Año anterior" className="cursor-pointer text-text-secondary"><ChevronLeft size={16} aria-hidden /></button>
          <span className="text-sm font-normal">{year}</span>
          <button type="button" aria-label="Año siguiente" className="cursor-pointer text-text-secondary"><ChevronRight size={16} aria-hidden /></button>
        </div>
        <div className="flex gap-1.5">
          {[...PERIOD_QUARTERS, `Año ${year}`].map((quarter) => (
            <button key={quarter} type="button" className="flex-1 cursor-pointer rounded-pill border border-border py-1.5 text-xs text-text-secondary hover:bg-surface">{quarter}</button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1">
          {PERIOD_MONTHS.map((month, index) => {
            const isEdge = index === fromIndex || index === toIndex;
            const isInside = index > fromIndex && index < toIndex;
            return (
              <button key={month} type="button" className={cn("h-[38px] cursor-pointer rounded-sm text-[13px]", isEdge ? "bg-lilac font-normal text-g-50" : isInside ? "bg-lilac/16 text-text-primary" : "text-text-muted hover:bg-surface", index === toIndex && "ring-1 ring-white")}>
                {month}
              </button>
            );
          })}
        </div>
        <p className="text-[11.5px] leading-[1.4] text-text-muted">{PERIOD_HELP}</p>
      </div>
    </div>
  );
}
