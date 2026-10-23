import { ChevronLeft, ChevronRight } from "lucide-react";
import { PERIOD_COPY } from "@/constants/nomina-period.constants";
import { PeriodMonthGrid } from "@/presentation/components/nomina/period-month-grid";
import { PeriodShortcutList } from "@/presentation/components/nomina/period-shortcut-list";
import type { PeriodPopoverProps } from "@/types/nomina-period.types";
import { cn } from "@/utils/cn";

/**
 * Contenido del selector de periodo: atajos a la izquierda y, a la derecha, el
 * año con sus trimestres y la rejilla de meses con el rango marcado. Sin
 * manejadores es solo visual.
 */
export function PeriodPopover({ year, shortcuts, chips, months, help, onShortcut, onChip, onMonth, onMonthHover, onYearChange }: PeriodPopoverProps) {
  return (
    <div role="dialog" aria-label={PERIOD_COPY.dialogLabel} className="glass-menu flex w-[min(600px,calc(100vw-2rem))] gap-[18px] rounded-[20px] p-4 max-sm:flex-col">
      <PeriodShortcutList shortcuts={shortcuts} onSelect={onShortcut} />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between">
          <button type="button" aria-label={PERIOD_COPY.previousYear} onClick={() => onYearChange?.(-1)} className="cursor-pointer text-text-secondary"><ChevronLeft size={16} aria-hidden /></button>
          <span className="text-sm font-normal tabular-nums">{year}</span>
          <button type="button" aria-label={PERIOD_COPY.nextYear} onClick={() => onYearChange?.(1)} className="cursor-pointer text-text-secondary"><ChevronRight size={16} aria-hidden /></button>
        </div>
        <div className="flex gap-1.5">
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              aria-pressed={chip.isActive}
              onClick={() => onChip?.(chip.id)}
              className={cn("flex-1 cursor-pointer rounded-pill border py-1.5 text-xs", chip.isActive ? "border-lilac bg-lilac/12 text-lilac" : "border-border text-text-secondary hover:bg-surface")}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <PeriodMonthGrid months={months} onSelect={onMonth} onHover={onMonthHover} />
        <p aria-live="polite" className="text-[11.5px] leading-[1.4] text-text-muted">{help}</p>
      </div>
    </div>
  );
}
