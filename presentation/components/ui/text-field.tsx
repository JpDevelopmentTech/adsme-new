import type { TextFieldProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

export function TextField({
  id,
  label,
  error,
  trailing,
  surface = "card",
  ...inputProps
}: TextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-text-secondary">
        {label}
      </label>

      <div
        className={cn(
          "flex items-center gap-2.5 rounded-md border px-3.5 py-3 transition-colors",
          "focus-within:border-brand-violet/70",
          FIELD_SURFACE_CLASSES[surface],
          error ? "border-danger" : "border-border",
        )}
      >
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          {...inputProps}
        />
        {trailing}
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
