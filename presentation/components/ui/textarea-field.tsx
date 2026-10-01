import { AlertCircle } from "lucide-react";
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
      <label htmlFor={id} className="text-xs font-normal text-text-secondary">
        {label}
      </label>

      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-[88px] w-full resize-none rounded-md border px-3.5 py-[13px] text-sm leading-[1.45] transition-colors",
          "text-text-primary outline-none placeholder:text-text-muted focus:border-white/40",
          FIELD_SURFACE_CLASSES[surface],
          error ? "border-danger bg-danger/8" : "border-border",
        )}
        {...textareaProps}
      />

      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs font-normal text-danger">
          <AlertCircle size={14} strokeWidth={1.75} className="shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}
