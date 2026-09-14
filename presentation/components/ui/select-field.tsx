import { ChevronDown } from "lucide-react";
import type { SelectFieldProps, SelectOption } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

/** Normaliza las opciones a pares valor/etiqueta. */
function toEntry(option: SelectOption) {
  return typeof option === "string" ? { value: option, label: option } : option;
}

export function SelectField({
  id,
  label,
  options,
  placeholder,
  error,
  surface = "card",
  ...selectProps
}: SelectFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-text-secondary">
        {label}
      </label>

      <div
        className={cn(
          "relative flex items-center rounded-md border transition-colors",
          "focus-within:border-brand-violet/70",
          FIELD_SURFACE_CLASSES[surface],
          error ? "border-danger" : "border-border",
        )}
      >
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full cursor-pointer appearance-none bg-transparent px-3.5 py-3 pr-10 text-sm text-text-primary outline-none"
          {...selectProps}
        >
          {placeholder ? (
            <option value="" disabled className="bg-card-elevated">
              {placeholder}
            </option>
          ) : null}
          {options.map(toEntry).map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-card-elevated"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden
          className="pointer-events-none absolute right-3.5 text-text-muted"
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
