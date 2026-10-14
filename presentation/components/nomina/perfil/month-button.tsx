import { Calendar } from "lucide-react";
import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import type { MonthButtonProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";

/** Botón del mes que se está viendo; en lila cuando es un mes histórico. */
export function MonthButton({ label, isHistoric, onToggle }: MonthButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isHistoric}
      title={PROFILE_COPY.monthButtonLabel}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-pill border px-3.5 py-2 text-[13px] font-normal whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        isHistoric ? "border-lilac/40 bg-lilac/16 text-lilac" : "border-border-strong bg-surface text-text-primary hover:bg-g-100",
      )}
    >
      <Calendar size={15} strokeWidth={1.5} aria-hidden />
      {label}
    </button>
  );
}
