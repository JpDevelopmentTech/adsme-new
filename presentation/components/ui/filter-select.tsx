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
        "flex shrink-0 items-center rounded-pill border transition-colors",
        isDefault
          ? "border-border bg-card hover:border-border-strong"
          : "border-brand-violet/50 bg-brand-violet/15",
      )}
    >
      <DropdownMenu
        side="bottom"
        align={align}
        label={label}
        trigger={() => (
          <span
            className={cn(
              "flex items-center gap-2 py-[9px] pl-3.5",
              canClear ? "pr-1.5" : "pr-3.5",
            )}
          >
            <span
              className={cn(
                "text-[13px] font-medium",
                isDefault ? "text-text-secondary" : "text-brand-violet",
              )}
            >
              {label}
            </span>
            {icon ?? (
              <ChevronDown
                size={15}
                aria-hidden
                className={isDefault ? "text-text-muted" : "text-brand-violet/70"}
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
              "flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-[13px] whitespace-nowrap transition-colors",
              option.value === value
                ? "text-text-primary"
                : "text-text-secondary hover:bg-card hover:text-text-primary",
            )}
          >
            <Check
              size={14}
              aria-hidden
              className={option.value === value ? "text-brand-violet" : "opacity-0"}
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
          className="cursor-pointer rounded-pill py-[9px] pr-3 pl-1 text-brand-violet transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
        >
          <X size={14} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
