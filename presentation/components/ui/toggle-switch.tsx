import type { ToggleSwitchProps } from "@/types/ui.types";

/**
 * Interruptor del diseño (42×24): pista blanca con la perilla en tinta cuando
 * está encendido; pista de vidrio con la perilla atenuada cuando no. Se apoya
 * en un checkbox real y en variantes `peer-checked`, así que funciona sin
 * JavaScript y es accesible por teclado.
 */
export function ToggleSwitch({
  id,
  name,
  label,
  description,
  defaultChecked = false,
  onChange,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3.5 last:border-b-0">
      <label htmlFor={id} className="flex cursor-pointer flex-col gap-[3px]">
        <span className="text-sm font-normal text-text-primary">{label}</span>
        {description ? (
          <span className="text-xs leading-[1.4] font-normal text-text-muted">{description}</span>
        ) : null}
      </label>

      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        aria-hidden
        className="mt-0.5 flex h-6 w-[42px] shrink-0 cursor-pointer items-center rounded-pill border border-white/25 bg-surface p-[2px] transition-colors peer-checked:border-transparent peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-lilac [&>span]:translate-x-0 [&>span]:bg-text-muted peer-checked:[&>span]:translate-x-[18px] peer-checked:[&>span]:bg-g-50"
      >
        <span className="size-[18px] rounded-full transition-transform duration-150" />
      </label>
    </div>
  );
}
