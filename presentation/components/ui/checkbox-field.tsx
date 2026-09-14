import { Check } from "lucide-react";
import type { CheckboxFieldProps } from "@/types/ui.types";

export function CheckboxField({
  id,
  name,
  label,
  defaultChecked,
}: CheckboxFieldProps) {
  return (
    <div className="flex items-center gap-2.5">
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        aria-hidden
        className="grid size-[19px] shrink-0 cursor-pointer place-items-center rounded-md border border-border-strong bg-card transition-colors [&_svg]:opacity-0 peer-checked:border-transparent peer-checked:bg-brand-gradient peer-checked:[&_svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-violet/60"
      >
        <Check size={13} strokeWidth={3} className="text-white" />
      </label>
      <label
        htmlFor={id}
        className="cursor-pointer text-[13px] text-text-secondary"
      >
        {label}
      </label>
    </div>
  );
}
