import { PERIOD_COPY, PERIOD_QUARTERS } from "@/constants/nomina-period.constants";
import type { PeriodChoice } from "@/types/nomina-period.types";

/** Chips Q1–Q4 y «Año AAAA» del año visible; `active` es el valor de `?periodo=` elegido. */
export function buildPeriodChips(year: number, active: string): PeriodChoice[] {
  const quarters = PERIOD_QUARTERS.map((quarter) => ({ id: `q${quarter}-${year}`, label: `Q${quarter}` }));
  return [...quarters, { id: `anio-${year}`, label: PERIOD_COPY.year(year) }].map((chip) => ({ ...chip, isActive: chip.id === active }));
}
