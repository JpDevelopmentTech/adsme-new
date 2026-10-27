"use client";

import { AlertCircle, ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import Select, { createFilter } from "react-select";
import { SEARCHABLE_CREATE_VALUE, SEARCHABLE_SELECT_COPY } from "@/constants/searchable-select.constants";
import { SearchableOptionLabel } from "@/presentation/components/ui/searchable-option-label";
import type { SearchableOption, SearchableSelectProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";
import { FIELD_SURFACE_CLASSES } from "@/utils/field-surface";

const matchesQuery = createFilter<SearchableOption>();

/**
 * Select con buscador sobre react-select, estilado con los tokens del diseño.
 *
 * Va `unstyled` para que todo el aspecto salga de Tailwind y no de los estilos
 * por defecto de la librería, que no encajan con el tema oscuro. Con
 * `createAction`, el menú cierra con una opción para crear lo que no está —con
 * lo escrito como punto de partida—; es una opción más, así que se alcanza con
 * las flechas y Enter, y nunca se queda seleccionada.
 */
export function SearchableSelect({
  id,
  name,
  label,
  options,
  defaultValue,
  value,
  onChange,
  createAction,
  placeholder,
  error,
  surface = "card",
  isClearable = false,
}: SearchableSelectProps) {
  // `useId` da ids estables entre servidor y cliente: sin esto react-select
  // genera unos aleatorios y React avisa de discrepancia al hidratar.
  const instanceId = useId();
  const [ownValue, setOwnValue] = useState(defaultValue ?? null);
  const [query, setQuery] = useState("");
  const currentValue = value !== undefined ? value : ownValue;
  const selected = options.find((option) => option.value === currentValue) ?? null;
  const menuOptions = createAction
    ? [...options, { value: SEARCHABLE_CREATE_VALUE, label: createAction.label(query.trim()) }]
    : options;

  const handleChange = (option: SearchableOption | null) => {
    if (option?.value === SEARCHABLE_CREATE_VALUE) return createAction?.onCreate(query.trim());
    setOwnValue(option?.value ?? null);
    onChange?.(option?.value ?? null);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-xs font-normal text-text-secondary">
        {label}
      </label>

      <Select<SearchableOption>
        unstyled
        inputId={id}
        instanceId={instanceId}
        name={name}
        options={menuOptions}
        value={selected}
        onChange={handleChange}
        onInputChange={(text, meta) => {
          if (meta.action === "input-change" || meta.action === "set-value" || meta.action === "input-blur") setQuery(text);
        }}
        filterOption={(option, text) => option.value === SEARCHABLE_CREATE_VALUE || matchesQuery(option, text)}
        isClearable={isClearable}
        placeholder={placeholder}
        noOptionsMessage={() => SEARCHABLE_SELECT_COPY.noOptions}
        loadingMessage={() => SEARCHABLE_SELECT_COPY.loading}
        aria-invalid={Boolean(error)}
        components={{
          DropdownIndicator: () => <ChevronDown size={16} className="mr-3.5 text-text-muted" aria-hidden />,
          IndicatorSeparator: null,
        }}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              "min-h-[50px] cursor-pointer rounded-md border text-sm text-text-primary transition-colors",
              FIELD_SURFACE_CLASSES[surface],
              isFocused ? "border-white/40" : "border-border",
              error && "border-danger bg-danger/8",
            ),
          valueContainer: () => "px-3.5 py-3 gap-1",
          placeholder: () => "text-text-muted",
          input: () => "text-text-primary",
          singleValue: () => "text-text-primary",
          menu: () => "glass-menu mt-2 overflow-hidden rounded-[14px]",
          menuList: () => "p-1.5 max-h-64",
          option: ({ isFocused, isSelected, data }) =>
            cn(
              "flex cursor-pointer items-center gap-2 rounded-[10px] px-3 py-2.5 text-[13px] font-normal transition-colors",
              isSelected ? "text-text-primary" : "text-text-secondary",
              isFocused && "bg-surface text-text-primary",
              data.value === SEARCHABLE_CREATE_VALUE && options.length > 0 && "mt-1 border-t border-border/60 rounded-t-none",
            ),
          noOptionsMessage: () => "px-3 py-3 text-[13px] text-text-muted",
          clearIndicator: () => "mr-1 cursor-pointer text-text-muted hover:text-text-primary",
        }}
        formatOptionLabel={(option, meta) => (
          <SearchableOptionLabel option={option} context={meta.context} selectedValue={meta.selectValue?.[0]?.value} />
        )}
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
