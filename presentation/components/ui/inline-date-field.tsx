import { Calendar } from "lucide-react";
import type { InlineDateFieldProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Fecha compacta para barras de filtros: el rótulo va dentro de la píldora,
 * delante del valor, y sigue siendo un `<label>` real. Como en `DateField`, el
 * indicador nativo se estira invisible para que cualquier clic abra el calendario.
 */
export function InlineDateField({ id, label, isInvalid = false, ...inputProps }: InlineDateFieldProps) {
  return (
    <div
      className={cn(
        "relative flex h-11 min-w-0 items-center gap-2 rounded-pill border bg-surface pr-3.5 pl-4 transition-colors",
        "focus-within:border-white/40 hover:border-border-strong",
        isInvalid ? "border-danger bg-danger/8" : "border-border",
      )}
    >
      <label htmlFor={id} className="shrink-0 text-xs font-normal text-text-muted">
        {label}
      </label>
      <input
        id={id}
        type="date"
        aria-invalid={isInvalid}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-[13px] text-text-primary tabular-nums outline-none [color-scheme:dark]",
          "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0",
          "[&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
        )}
        {...inputProps}
      />
      <Calendar size={15} strokeWidth={1.5} className="shrink-0 text-text-muted" aria-hidden />
    </div>
  );
}
