import type { TextareaFieldProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

export function TextareaField({
  id,
  label,
  error,
  surface = "card",
  ...textareaProps
}: TextareaFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-text-secondary">
        {label}
      </label>

      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-[88px] w-full resize-none rounded-md border px-3.5 py-3 text-[13px] leading-[1.4] transition-colors",
          "text-text-primary outline-none placeholder:text-text-muted focus:border-brand-violet/70",
          FIELD_SURFACE_CLASSES[surface],
          error ? "border-danger" : "border-border",
        )}
        {...textareaProps}
      />

      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
