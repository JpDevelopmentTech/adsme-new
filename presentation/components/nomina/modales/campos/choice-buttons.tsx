import type { ChoiceButtonsProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";

/** Opciones excluyentes en botones del mismo ancho; la elegida va en lila. */
export function ChoiceButtons<TValue extends string>({ label, value, options, onChange }: ChoiceButtonsProps<TValue>) {
  return (
    <div role="group" aria-label={label} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-[42px] cursor-pointer rounded-sm border px-2 text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
              isSelected ? "border-lilac/70 bg-lilac/14 font-normal text-lilac" : "border-border bg-card-elevated font-light text-text-secondary hover:text-text-primary",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
