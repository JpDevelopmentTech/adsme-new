import type { TextInputProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";
import { NOMINA_FIELD_BOX, NOMINA_FIELD_INPUT, NOMINA_FIELD_TONE } from "@/utils/nomina-field-styles";

/** Campo de texto con la caja de los modales; marca el error con el borde. */
export function TextInput({ isInvalid = false, disabled, ...inputProps }: TextInputProps) {
  const tone = isInvalid ? "invalid" : disabled ? "disabled" : "normal";

  return (
    <div className={cn(NOMINA_FIELD_BOX, NOMINA_FIELD_TONE[tone])}>
      <input aria-invalid={isInvalid} disabled={disabled} className={NOMINA_FIELD_INPUT} {...inputProps} />
    </div>
  );
}
