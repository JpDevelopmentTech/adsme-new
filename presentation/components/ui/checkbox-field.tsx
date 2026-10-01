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
        className="grid size-5 shrink-0 cursor-pointer place-items-center rounded-[6px] border-[1.5px] border-white/40 bg-transparent transition-colors [&_svg]:opacity-0 peer-checked:border-transparent peer-checked:bg-ink peer-checked:[&_svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-lilac"
      >
        <Check size={13} strokeWidth={2.5} className="text-g-50" />
      </label>
      <label
        htmlFor={id}
        className="cursor-pointer text-sm font-normal text-text-primary"
      >
        {label}
      </label>
    </div>
  );
}
