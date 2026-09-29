"use client";

import { useState } from "react";
import { CURRENCY_SYMBOL } from "@/constants/currency.constants";
import {
  REPORT_SETTINGS_FIELDS,
  STEP_THREE_COPY,
} from "@/constants/report-config.constants";
import { CurrencyField } from "@/presentation/components/ui/currency-field";
import type { CpvChargeFieldProps } from "@/types/job-wizard.types";
import { estimateCpvViews } from "@/utils/estimate-cpv-views";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";
import { parseCpvInput } from "@/utils/parse-cpv-input";

/**
 * Campo del CPV cobrado. Traduce el importe a vistas sobre la inversión del
 * trabajo mientras se escribe: un CPV suelto no dice si es razonable, las
 * vistas que compromete sí.
 */
export function CpvChargeField({
  defaultValue,
  investment,
  error,
}: CpvChargeFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const views = estimateCpvViews(investment, parseCpvInput(value));

  const hint =
    investment <= 0
      ? STEP_THREE_COPY.cpvNoInvestment
      : views !== null
        ? STEP_THREE_COPY.cpvViews(
            formatExactNumber(views),
            formatExactCurrency(investment),
          )
        : undefined;

  return (
    <CurrencyField
      id={REPORT_SETTINGS_FIELDS.chargedCpv}
      name={REPORT_SETTINGS_FIELDS.chargedCpv}
      label={STEP_THREE_COPY.cpvLabel}
      symbol={CURRENCY_SYMBOL}
      currency={STEP_THREE_COPY.cpvUnit}
      inputMode="decimal"
      placeholder={STEP_THREE_COPY.cpvPlaceholder}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      hint={hint}
      error={error ?? undefined}
      surface="card"
      autoFocus={defaultValue === ""}
    />
  );
}
