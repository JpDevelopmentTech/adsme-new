import type { ToggleSwitchProps } from "@/types/ui.types";

/**
 * Interruptor del diseño (46×26). Se apoya en un checkbox real y en variantes
 * `peer-checked`, así que funciona sin JavaScript y es accesible por teclado.
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
    <div className="flex items-center justify-between gap-3 border-b border-border px-[18px] py-3 last:border-b-0">
      <label htmlFor={id} className="flex cursor-pointer flex-col gap-0.5">
        <span className="text-[13px] font-medium text-text-primary">{label}</span>
        {description ? (
          <span className="text-xs text-text-muted">{description}</span>
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
        className="flex h-[26px] w-[46px] shrink-0 cursor-pointer items-center rounded-pill bg-card p-[3px] transition-colors peer-checked:bg-brand-gradient peer-focus-visible:ring-2 peer-focus-visible:ring-brand-violet/60 [&>span]:translate-x-0 peer-checked:[&>span]:translate-x-5"
      >
        <span className="size-5 rounded-full bg-text-muted transition-transform peer-checked:bg-white" />
      </label>
    </div>
  );
}
