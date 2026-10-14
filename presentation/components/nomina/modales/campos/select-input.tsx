import { Calendar, ChevronDown } from "lucide-react";
import type { SelectInputProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";
import { NOMINA_FIELD_BOX, NOMINA_FIELD_TONE } from "@/utils/nomina-field-styles";

/** `select` nativo con la caja de los modales, chevron y, si se pide, icono de calendario. */
export function SelectInput({ id, value, options, onChange, placeholder, hasIcon = true }: SelectInputProps) {
  return (
    <div className={cn(NOMINA_FIELD_BOX, NOMINA_FIELD_TONE.normal, "relative px-0")}>
      {hasIcon ? <Calendar size={16} strokeWidth={1.5} aria-hidden className="pointer-events-none absolute left-3.5 text-text-secondary" /> : null}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "w-full cursor-pointer appearance-none bg-transparent py-3 pr-10 text-base text-text-primary outline-none sm:text-sm [&_option]:bg-[#140c26]",
          hasIcon ? "pl-10" : "pl-3.5",
          !value && "text-text-muted",
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} aria-hidden className="pointer-events-none absolute right-3.5 text-text-muted" />
    </div>
  );
}
