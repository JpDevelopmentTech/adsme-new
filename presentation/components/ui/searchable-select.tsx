"use client";

import { Check, ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import Select from "react-select";
import type { SearchableSelectProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

interface Option {
  value: string;
  label: string;
}

/**
 * Select con buscador sobre react-select, estilado con los tokens del diseño.
 *
 * Va `unstyled` para que todo el aspecto salga de Tailwind y no de los estilos
 * por defecto de la librería, que no encajan con el tema oscuro.
 */
export function SearchableSelect({
  id,
  name,
  label,
  options,
  defaultValue,
  placeholder,
  error,
  surface = "card",
  isClearable = false,
}: SearchableSelectProps) {
  // `useId` da ids estables entre servidor y cliente: sin esto react-select
  // genera unos aleatorios y React avisa de discrepancia al hidratar.
  const instanceId = useId();
  const [selected, setSelected] = useState<Option | null>(
    options.find((option) => option.value === defaultValue) ?? null,
  );

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-text-secondary">
        {label}
      </label>

      <Select<Option>
        unstyled
        inputId={id}
        instanceId={instanceId}
        name={name}
        options={options}
        value={selected}
        onChange={(option) => setSelected(option)}
        isClearable={isClearable}
        placeholder={placeholder}
        noOptionsMessage={() => "Sin coincidencias"}
        loadingMessage={() => "Buscando…"}
        aria-invalid={Boolean(error)}
        components={{
          DropdownIndicator: () => (
            <ChevronDown size={16} className="mr-3.5 text-text-muted" aria-hidden />
          ),
          IndicatorSeparator: null,
        }}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              "cursor-pointer rounded-md border text-sm text-text-primary transition-colors",
              FIELD_SURFACE_CLASSES[surface],
              isFocused ? "border-brand-violet/70" : "border-border",
              error && "border-danger",
            ),
          valueContainer: () => "px-3.5 py-3 gap-1",
          placeholder: () => "text-text-muted",
          input: () => "text-text-primary",
          singleValue: () => "text-text-primary",
          menu: () =>
            "mt-2 overflow-hidden rounded-md border border-border bg-card-elevated shadow-xl shadow-black/10",
          menuList: () => "p-1.5 max-h-64",
          option: ({ isFocused, isSelected }) =>
            cn(
              "flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-[13px] transition-colors",
              isSelected ? "text-text-primary" : "text-text-secondary",
              isFocused && "bg-card text-text-primary",
            ),
          noOptionsMessage: () => "px-3 py-3 text-[13px] text-text-muted",
          clearIndicator: () => "mr-1 cursor-pointer text-text-muted hover:text-text-primary",
        }}
        formatOptionLabel={(option, meta) => (
          <span className="flex min-w-0 items-center gap-2">
            {meta.context === "menu" ? (
              <Check
                size={14}
                aria-hidden
                className={cn(
                  "shrink-0 text-brand-violet",
                  meta.selectValue?.[0]?.value === option.value
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
            ) : null}
            <span className="truncate">{option.label}</span>
          </span>
        )}
      />

      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
