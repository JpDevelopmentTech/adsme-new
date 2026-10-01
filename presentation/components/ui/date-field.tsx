import { AlertCircle, Calendar } from "lucide-react";
import type { DateFieldProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

/**
 * Campo de fecha con el icono del calendario a la derecha, como en el diseño. El indicador nativo se
 * estira invisible sobre todo el campo para que un clic en cualquier punto abra
 * el calendario del navegador.
 */
export function DateField({
  id,
  label,
  error,
  surface = "card",
  ...inputProps
}: DateFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-xs font-normal text-text-secondary">
        {label}
      </label>

      <div
        className={cn(
          "relative flex min-h-[50px] items-center gap-2.5 rounded-md border px-3.5 transition-colors",
          "focus-within:border-white/40",
          FIELD_SURFACE_CLASSES[surface],
          error ? "border-danger bg-danger/8" : "border-border",
        )}
      >
        <input
          id={id}
          type="date"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none [color-scheme:dark]",
            "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0",
            "[&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full",
            "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
          )}
          {...inputProps}
        />
        <Calendar size={16} strokeWidth={1.5} className="shrink-0 text-text-muted" aria-hidden />
      </div>

      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs font-normal text-danger">
          <AlertCircle size={14} strokeWidth={1.75} className="shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}
