import type { PeriodMonthGridProps } from "@/types/nomina-period.types";
import { cn } from "@/utils/cn";

const TONE_CLASSES = {
  edge: "bg-lilac font-normal text-g-50",
  inside: "bg-lilac/16 text-text-primary",
  idle: "text-text-muted hover:bg-surface",
} as const;

/** Rejilla de los 12 meses del año visible: extremos del rango en lila, el interior tenue y el mes en curso con anillo. */
export function PeriodMonthGrid({ months, onSelect, onHover }: PeriodMonthGridProps) {
  return (
    <div className="grid grid-cols-4 gap-1" onMouseLeave={() => onHover?.(null)}>
      {months.map((cell) => (
        <button
          key={cell.month}
          type="button"
          onClick={() => onSelect?.(cell.month)}
          onMouseEnter={() => onHover?.(cell.month)}
          className={cn("h-[38px] cursor-pointer rounded-sm text-[13px]", TONE_CLASSES[cell.tone], cell.isCurrent && "ring-1 ring-white")}
        >
          {cell.label}
        </button>
      ))}
    </div>
  );
}
