import type { NominaPeriodSelection } from "@/domain/entities/nomina-period";

/** Valor de `?periodo=` de un periodo; el inverso de `parseFinancePeriod`. */
export function serializeFinancePeriod(selection: NominaPeriodSelection): string {
  switch (selection.kind) {
    case "preset":
      return selection.preset;
    case "quarter":
      return `q${selection.quarter}-${selection.year}`;
    case "year":
      return `anio-${selection.year}`;
    default:
      return `${selection.from}_${selection.to}`;
  }
}
