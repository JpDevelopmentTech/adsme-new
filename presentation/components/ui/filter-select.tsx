"use client";

import { Check, ChevronDown, X } from "lucide-react";
import { DropdownMenu } from "@/presentation/components/ui/dropdown-menu";
import type { FilterSelectProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Chip del diseño convertido en selector: muestra la opción activa y despliega
 * el resto. Cuando filtra de verdad se tiñe de marca, para que un filtro puesto
 * no se confunda con uno vacío. El valor por defecto no se escribe en la URL.
 */
export function FilterSelect<TValue extends string>({
  prefix,
  value,
  options,
  defaultValue,
  icon,
  align = "start",
  onChange,
  onClear,
}: FilterSelectProps<TValue>) {
  const selected = options.find((option) => option.value === value) ?? options[0];
  const isDefault = value === defaultValue;
  const label = prefix ? `${prefix}: ${selected.label}` : selected.label;
  const canClear = !isDefault && onClear !== undefined;

  return (
    <div
      className={cn(
        "flex h-10 shrink-0 items-center rounded-pill border transition-colors duration-150",
        isDefault ? "border-border bg-surface hover:border-border-strong" : "border-lilac/35 bg-lilac/12",
      )}
    >
      <DropdownMenu
        side="bottom"
        align={align}
        label={label}
        trigger={() => (
          <span
            className={cn(
              "flex items-center gap-1.5 py-2 pl-3.5",
              canClear ? "pr-1.5" : "pr-3.5",
            )}
          >
            <span className="text-[13px] font-normal whitespace-nowrap">
              {prefix ? <span className="font-light text-text-muted">{prefix}: </span> : null}
              <span className="text-text-primary">{selected.label}</span>
            </span>
            {icon ?? (
              <ChevronDown
                size={14}
                aria-hidden
                className={isDefault ? "text-text-muted" : "text-text-secondary"}
              />
            )}
          </span>
        )}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="menuitem"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex w-full cursor-pointer items-center gap-2 rounded-[10px] px-3 py-2 text-[13px] font-normal whitespace-nowrap transition-colors",
              option.value === value
                ? "bg-surface text-text-primary"
                : "text-text-secondary hover:bg-surface hover:text-text-primary",
            )}
          >
            <Check
              size={14}
              aria-hidden
              className={option.value === value ? "text-lilac" : "opacity-0"}
            />
            {option.label}
          </button>
        ))}
      </DropdownMenu>

      {canClear ? (
        <button
          type="button"
          onClick={onClear}
          aria-label={`Quitar filtro ${prefix ?? selected.label}`}
          className="mr-1.5 grid size-6 cursor-pointer place-items-center rounded-pill bg-surface text-text-primary transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
        >
          <X size={12} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
