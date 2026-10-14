import type { SwitchControlProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";

/**
 * Interruptor de una pregunta del formulario: la pregunta arriba y, a su lado,
 * el texto del estado («Sí, aplica…» / «No aplica»), que acompaña al color.
 */
export function SwitchControl({ id, label, isChecked, onChange, onLabel, offLabel }: SwitchControlProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <span id={`${id}-label`} className="text-[13px] font-light text-text-primary">
        {label}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-state`}
        onClick={() => onChange(!isChecked)}
        className="flex w-fit cursor-pointer items-center gap-3 rounded-pill text-left focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        <span className={cn("flex h-6 w-[42px] shrink-0 items-center rounded-pill border p-[2px] transition-colors", isChecked ? "border-transparent bg-ink" : "border-white/25 bg-surface")}>
          <span className={cn("size-[18px] rounded-full transition-transform duration-150", isChecked ? "translate-x-[18px] bg-g-50" : "bg-text-muted")} />
        </span>
        <span id={`${id}-state`} className="text-sm font-light text-text-primary">
          {isChecked ? onLabel : offLabel}
        </span>
      </button>
    </div>
  );
}
