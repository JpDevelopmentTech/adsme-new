import { AlertCircle } from "lucide-react";
import type { CurrencyFieldProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

/**
 * Importe con su símbolo y su moneda a la vista. El valor viaja ya agrupado en
 * miles; quien lo reciba debe quedarse solo con los dígitos.
 */
export function CurrencyField({
  id,
  label,
  error,
  hint,
  symbol,
  currency,
  surface = "card",
  ...inputProps
}: CurrencyFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-xs font-normal text-text-secondary">
        {label}
      </label>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div
          className={cn(
            "flex min-h-[50px] flex-1 items-center gap-2.5 rounded-md border px-3.5 transition-colors",
            "focus-within:border-white/40",
            FIELD_SURFACE_CLASSES[surface],
            error ? "border-danger bg-danger/8" : "border-border",
          )}
        >
          <span aria-hidden className="text-sm font-normal text-text-muted">
            {symbol}
          </span>

          <input
            id={id}
            inputMode="numeric"
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-text-primary tabular-nums outline-none placeholder:text-text-muted"
            {...inputProps}
          />

          <span className="text-[13px] font-normal text-text-muted">{currency}</span>
        </div>

        {hint ? (
          <p className="min-w-[220px] flex-1 text-xs font-normal text-text-muted">{hint}</p>
        ) : null}
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
