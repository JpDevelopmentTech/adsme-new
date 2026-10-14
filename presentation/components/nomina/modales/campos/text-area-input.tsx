import type { TextAreaInputProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";
import { NOMINA_FIELD_TONE } from "@/utils/nomina-field-styles";

/** Texto largo con la caja de los modales (2 filas por defecto). */
export function TextAreaInput({ isInvalid = false, rows = 2, ...textareaProps }: TextAreaInputProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={isInvalid}
      className={cn(
        "w-full resize-none rounded-md border bg-card-elevated px-3.5 py-3 text-base leading-[1.45] font-light text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/40 focus:ring-2 focus:ring-lilac/60 sm:text-sm",
        NOMINA_FIELD_TONE[isInvalid ? "invalid" : "normal"],
      )}
      {...textareaProps}
    />
  );
}
