import { PERIOD_COPY, PERIOD_PRESETS } from "@/constants/nomina-period.constants";
import type { NominaPeriodSelection } from "@/domain/entities/nomina-period";
import { formatMonthSpan } from "@/utils/format-month-span";

/** Nombre del periodo elegido: el del atajo, «Q2 2026», «Año 2026» o el propio rango. */
export function formatPeriodSelection(selection: NominaPeriodSelection, fromMonth: string, toMonth: string): string {
  switch (selection.kind) {
    case "preset":
      return PERIOD_PRESETS.find((item) => item.preset === selection.preset)?.label ?? "";
    case "quarter":
      return PERIOD_COPY.quarter(selection.quarter, selection.year);
    case "year":
      return PERIOD_COPY.year(selection.year);
    default:
      return formatMonthSpan(fromMonth, toMonth);
  }
}
