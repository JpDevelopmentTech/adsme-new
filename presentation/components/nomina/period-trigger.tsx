import { Calendar, ChevronDown } from "lucide-react";
import type { PeriodTriggerProps } from "@/types/nomina-period.types";
import { cn } from "@/utils/cn";

/** Botón del periodo: el nombre elegido y, al lado, el rango resuelto. */
export function PeriodTrigger({ label, range, isOpen, onClick }: PeriodTriggerProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2.5 rounded-pill border border-border-strong bg-surface px-3.5 py-[9px] text-[13px] font-normal transition-colors hover:bg-g-100 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      <Calendar size={15} strokeWidth={1.5} className="text-lilac" aria-hidden />
      {label}
      <span className="text-xs text-text-muted">{range}</span>
      <ChevronDown size={14} strokeWidth={1.5} className={cn("text-text-secondary transition-transform", isOpen && "rotate-180")} aria-hidden />
    </button>
  );
}
