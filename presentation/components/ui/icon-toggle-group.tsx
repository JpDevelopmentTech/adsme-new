"use client";

import type { IconToggleGroupProps } from "@/types/nomina-chart.types";
import { cn } from "@/utils/cn";

/** Conmutador de iconos excluyentes; cada opción lleva su nombre accesible. */
export function IconToggleGroup<TValue extends string>({ label, value, options, onChange }: IconToggleGroupProps<TValue>) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-0.5 rounded-pill border border-border bg-surface p-[3px]">
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            title={option.label}
            aria-label={option.label}
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "grid h-[30px] w-[34px] cursor-pointer place-items-center rounded-pill transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
              isSelected ? "bg-ink text-g-50" : "text-text-secondary hover:text-text-primary",
            )}
          >
            <Icon size={15} strokeWidth={1.75} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
