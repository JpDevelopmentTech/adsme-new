import type { NominaIncomeContext } from "@/types/nomina-modales-ingreso.types";
import type { NominaIncomeMonthProps } from "@/types/nomina-modals.types";
import { suggestMinShows } from "@/utils/suggest-min-shows";

/** Completa los datos del mes que no lleguen: mínimo sugerido y mes sin facturar. */
export function resolveIncomeContext(nomina: number, props: NominaIncomeMonthProps): NominaIncomeContext {
  return {
    minShows: props.minShows ?? suggestMinShows(nomina) ?? 1,
    monthBilled: props.monthBilled ?? 0,
    monthMovementCount: props.monthMovementCount ?? 0,
  };
}
