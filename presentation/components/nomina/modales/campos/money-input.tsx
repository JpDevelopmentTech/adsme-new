import { MODAL_COMMON_COPY } from "@/constants/nomina-modales-copy.constants";
import type { MoneyInputProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";
import { formatThousands } from "@/utils/format-thousands";
import { NOMINA_FIELD_BOX, NOMINA_FIELD_INPUT, NOMINA_FIELD_TONE } from "@/utils/nomina-field-styles";
import { parseThousands } from "@/utils/parse-thousands";

/** Importe en pesos: se escribe con «$» y separador de miles; guarda solo el número. */
export function MoneyInput({ id, value, onChange, placeholder, isInvalid = false, disabled, ariaLabel, isBare = false }: MoneyInputProps) {
  const text = value === null ? "" : `${MODAL_COMMON_COPY.money}${formatThousands(String(value))}`;
  const input = (
    <input
      id={id}
      inputMode="numeric"
      autoComplete="off"
      value={text}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-invalid={isInvalid}
      onChange={(event) => onChange(/\d/.test(event.target.value) ? parseThousands(event.target.value) : null)}
      className={cn(NOMINA_FIELD_INPUT, "tabular-nums", isBare && "py-0 text-[15px] sm:text-[15px]")}
    />
  );

  if (isBare) return input;
  return <div className={cn(NOMINA_FIELD_BOX, NOMINA_FIELD_TONE[isInvalid ? "invalid" : disabled ? "disabled" : "normal"])}>{input}</div>;
}
