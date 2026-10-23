"use client";

import { PeriodPopover } from "@/presentation/components/nomina/period-popover";
import { useFinancePeriodPicker } from "@/presentation/hooks/use-finance-period-picker";
import type { FinancePeriodPickerInput } from "@/types/nomina-period.types";

/** Popover del periodo de Finanzas: monta el estado del selector solo mientras está abierto. */
export function FinancePeriodPopover(props: FinancePeriodPickerInput) {
  return <PeriodPopover {...useFinancePeriodPicker(props)} />;
}
