import { AlertCircle } from "lucide-react";
import type { TextFieldProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

export function TextField({
  id,
  label,
  error,
  leading,
  trailing,
  surface = "card",
  ...inputProps
}: TextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-xs font-normal text-text-secondary">
        {label}
      </label>

      <div
        className={cn(
          "flex min-h-[50px] items-center gap-2.5 rounded-md border px-3.5 transition-colors",
          "focus-within:border-white/40",
          FIELD_SURFACE_CLASSES[surface],
          error ? "border-danger bg-danger/8" : "border-border",
        )}
      >
        {leading ? (
          <span
            aria-hidden
            className={cn("flex shrink-0", error ? "text-danger" : "text-text-muted")}
          >
            {leading}
          </span>
        ) : null}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
          {...inputProps}
        />
        {trailing}
      </div>

      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1.5 text-xs font-normal text-danger"
        >
          <AlertCircle size={14} strokeWidth={1.75} className="shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}
