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
      <label htmlFor={id} className="text-[13px] font-medium text-text-secondary">
        {label}
      </label>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div
          className={cn(
            "flex flex-1 items-center gap-2.5 rounded-md border px-3.5 py-3 transition-colors",
            "focus-within:border-brand-violet/70",
            FIELD_SURFACE_CLASSES[surface],
            error ? "border-danger" : "border-border",
          )}
        >
          <span aria-hidden className="font-display text-sm font-bold text-text-muted">
            {symbol}
          </span>

          <input
            id={id}
            inputMode="numeric"
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            {...inputProps}
          />

          <span className="text-xs font-semibold text-text-muted">{currency}</span>
        </div>

        {hint ? (
          <p className="min-w-[220px] flex-1 text-xs text-text-muted">{hint}</p>
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
