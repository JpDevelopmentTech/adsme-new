"use client";

import type { SegmentedControlProps } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Grupo de opciones excluyentes visibles a la vez. Frente a un desplegable,
 * cambiar de opción cuesta un clic en lugar de dos; solo compensa con pocas.
 */
export function SegmentedControl<TValue extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<TValue>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex shrink-0 items-center gap-0.5 rounded-pill border border-border bg-card p-[3px]"
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "cursor-pointer rounded-pill px-[15px] py-[7px] text-[13px] transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none",
              isSelected
                ? "bg-card-elevated font-semibold text-text-primary"
                : "font-medium text-text-secondary hover:text-text-primary",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
