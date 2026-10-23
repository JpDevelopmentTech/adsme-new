import type { NominaPeriodSelection } from "@/domain/entities/nomina-period";

/** Periodo de Finanzas cuando no se elige ninguno: los últimos 6 meses, como el original. */
export const DEFAULT_NOMINA_PERIOD: NominaPeriodSelection = { kind: "preset", preset: "6m" };
