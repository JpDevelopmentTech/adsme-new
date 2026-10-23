"use client";

import { useState } from "react";
import { CURRENCY_SYMBOLS } from "@/constants/currency.constants";
import {
  REPORT_SETTINGS_FIELDS,
  STEP_THREE_COPY,
} from "@/constants/report-config.constants";
import { CurrencyField } from "@/presentation/components/ui/currency-field";
import type { TrmRateFieldProps } from "@/types/job-wizard.types";
import { describeTrmConversion } from "@/utils/describe-trm-conversion";
import { parseTrmInput } from "@/utils/parse-trm-input";

/**
 * Campo de la TRM acordada con el cliente. Arranca vacío a propósito: la tasa
 * es la que se pactó, no la oficial del día. Mientras se escribe enseña en qué
 * se convierten los dólares del trabajo.
 */
export function TrmRateField({ defaultValue, jobSpend, error }: TrmRateFieldProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <CurrencyField
      id={REPORT_SETTINGS_FIELDS.usdCopRate}
      name={REPORT_SETTINGS_FIELDS.usdCopRate}
      label={STEP_THREE_COPY.trmLabel}
      symbol={CURRENCY_SYMBOLS.COP}
      currency={STEP_THREE_COPY.trmUnit}
      inputMode="decimal"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      hint={describeTrmConversion(jobSpend, parseTrmInput(value))}
      error={error ?? undefined}
      surface="card"
      autoFocus={defaultValue === ""}
    />
  );
}
