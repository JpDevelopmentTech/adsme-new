import type { NominaPeriodRange, NominaPeriodSelection } from "@/domain/entities/nomina-period";
import { shiftMonth } from "@/utils/shift-month";

/** Meses hacia atrás de cada atajo relativo al mes en curso. */
const RELATIVE: Record<"mes" | "3m" | "6m" | "12m", number> = { mes: 0, "3m": 2, "6m": 5, "12m": 11 };

/** Primer y último mes con movimientos, o `null` si todavía no hay. */
export interface NominaDataBounds {
  first: string;
  last: string;
}

/**
 * Convierte el periodo elegido en meses, como el selector original: los atajos
 * cuentan desde el mes en curso; «Todo» va del primer mes con datos hasta el
 * último (o el actual) y no se compara con nada.
 */
export function resolveFinancePeriod(selection: NominaPeriodSelection, currentMonth: string, bounds: NominaDataBounds | null): NominaPeriodRange {
  if (selection.kind === "quarter") {
    const from = `${selection.year}-${String((selection.quarter - 1) * 3 + 1).padStart(2, "0")}`;
    return { from, to: shiftMonth(from, 2), compare: true };
  }
  if (selection.kind === "year") return { from: `${selection.year}-01`, to: `${selection.year}-12`, compare: true };
  if (selection.kind === "range") return { from: selection.from, to: selection.to, compare: true };

  const { preset } = selection;
  if (preset === "pasado") {
    const previous = shiftMonth(currentMonth, -1);
    return { from: previous, to: previous, compare: true };
  }
  if (preset === "todo") {
    const to = bounds && bounds.last > currentMonth ? bounds.last : currentMonth;
    const from = bounds && bounds.first < to ? bounds.first : shiftMonth(to, -5);
    return { from, to, compare: false };
  }
  return { from: shiftMonth(currentMonth, -RELATIVE[preset]), to: currentMonth, compare: true };
}
