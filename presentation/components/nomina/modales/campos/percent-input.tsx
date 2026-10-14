"use client";

import { useState } from "react";
import { MODAL_COMMON_COPY } from "@/constants/nomina-modales-copy.constants";
import type { PercentInputProps } from "@/types/nomina-modales-fields.types";
import { cn } from "@/utils/cn";
import { formatPlainPercent } from "@/utils/format-plain-percent";
import { NOMINA_FIELD_BOX, NOMINA_FIELD_INPUT, NOMINA_FIELD_TONE } from "@/utils/nomina-field-styles";

/** Lee «12,5» o «12.5»; lo que no sea número cuenta como 0. */
function parseDecimal(text: string): number {
  const value = Number(text.replace(",", "."));
  return Number.isFinite(value) ? value : 0;
}

/**
 * Porcentaje con decimales y el «%» a la derecha. Guarda el texto tal cual se
 * escribe (para no perder «12,») y lo resincroniza si el valor cambia desde fuera.
 */
export function PercentInput({ id, value, onChange, isInvalid = false }: PercentInputProps) {
  const [text, setText] = useState(formatPlainPercent(value).replace(/\./g, ""));
  const [lastValue, setLastValue] = useState(value);

  if (value !== lastValue) {
    setLastValue(value);
    if (parseDecimal(text) !== value) setText(formatPlainPercent(value).replace(/\./g, ""));
  }

  return (
    <div className={cn(NOMINA_FIELD_BOX, NOMINA_FIELD_TONE[isInvalid ? "invalid" : "normal"])}>
      <input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        value={text}
        aria-invalid={isInvalid}
        onChange={(event) => {
          const next = event.target.value.replace(/[^\d.,-]/g, "");
          setText(next);
          setLastValue(parseDecimal(next));
          onChange(parseDecimal(next));
        }}
        className={cn(NOMINA_FIELD_INPUT, "tabular-nums")}
      />
      <span aria-hidden className="text-sm text-text-muted">{MODAL_COMMON_COPY.percent}</span>
    </div>
  );
}
