import { AlertCircle, ChevronDown } from "lucide-react";
import type { SelectFieldProps, SelectOption, SelectOptionGroup } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

/** Normaliza las opciones a pares valor/etiqueta. */
function toEntry(option: SelectOption) {
  return typeof option === "string" ? { value: option, label: option } : option;
}

/** Distingue un grupo de una opción suelta. */
function isGroup(item: SelectOption | SelectOptionGroup): item is SelectOptionGroup {
  return typeof item !== "string" && "options" in item;
}

/** Pinta una opción suelta. */
function renderOption(option: SelectOption) {
  const entry = toEntry(option);
  return (
    <option key={entry.value} value={entry.value}>
      {entry.label}
    </option>
  );
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
      <label htmlFor={id} className="text-xs font-normal text-text-secondary">
        {label}
      </label>

      <div
        className={cn(
          "relative flex min-h-[50px] items-center rounded-md border transition-colors",
          "focus-within:border-white/40",
          FIELD_SURFACE_CLASSES[surface],
          error ? "border-danger bg-danger/8" : "border-border",
        )}
      >
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full cursor-pointer appearance-none bg-transparent px-3.5 py-3 pr-10 text-sm text-text-primary outline-none [&_optgroup]:bg-[#140c26] [&_optgroup]:text-text-muted [&_option]:bg-[#140c26] [&_option]:text-text-primary"
          {...selectProps}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((item) =>
            isGroup(item) ? (
              <optgroup key={item.label} label={item.label}>
                {item.options.map(renderOption)}
              </optgroup>
            ) : (
              renderOption(item)
            ),
          )}
        </select>
        <ChevronDown
          size={16}
          aria-hidden
          className="pointer-events-none absolute right-3.5 text-text-muted"
        />
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
