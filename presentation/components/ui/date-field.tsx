import { Calendar } from "lucide-react";
import type { DateFieldProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

/**
 * Campo de fecha con el icono del diseño a la izquierda. El indicador nativo se
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
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <div
        className={cn(
          "relative flex items-center gap-2.5 rounded-md border px-3.5 py-3 transition-colors",
          "focus-within:border-brand-violet/70",
          FIELD_SURFACE_CLASSES[surface],
          error ? "border-danger" : "border-border",
        )}
      >
        <Calendar size={16} className="shrink-0 text-text-muted" aria-hidden />
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
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
