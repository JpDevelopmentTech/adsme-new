import { Calendar } from "lucide-react";
import type { DateInputProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";
import { formatLongDate } from "@/utils/format-nomina-dates";
import { NOMINA_FIELD_BOX, NOMINA_FIELD_TONE } from "@/utils/nomina-field-styles";

/**
 * Fecha que se lee «Octubre 14, 2026»: el `<input type="date">` nativo queda
 * invisible encima de todo el campo y abre el calendario del navegador al pulsar.
 */
export function DateInput({ id, value, onChange }: DateInputProps) {
  return (
    <div className={cn(NOMINA_FIELD_BOX, NOMINA_FIELD_TONE.normal, "relative")}>
      <Calendar size={16} strokeWidth={1.5} aria-hidden className="shrink-0 text-text-secondary" />
      <span aria-hidden className="flex-1 truncate text-sm text-text-primary">
        {value ? formatLongDate(value) : ""}
      </span>
      <input
        id={id}
        type="date"
        value={value}
        required
        onChange={(event) => {
          if (event.target.value) onChange(event.target.value);
        }}
        onClick={(event) => event.currentTarget.showPicker?.()}
        className="absolute inset-0 cursor-pointer opacity-0 [color-scheme:dark]"
      />
    </div>
  );
}
