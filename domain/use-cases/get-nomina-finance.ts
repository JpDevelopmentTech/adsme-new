import { DEFAULT_NOMINA_PERIOD } from "@/constants/nomina-default-period.constants";
import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { NominaPeriodSelection } from "@/domain/entities/nomina-period";
import type { NominaRepository } from "@/domain/interfaces/nomina-repository";

/**
 * Caso de uso: finanzas del roster en el periodo elegido (atajo, trimestre,
 * año o rango de meses). Sin periodo, los últimos 6 meses.
 */
export function createGetNominaFinance(repository: NominaRepository) {
  return async function getNominaFinance(selection: NominaPeriodSelection = DEFAULT_NOMINA_PERIOD): Promise<NominaFinance> {
    return repository.getFinance(selection);
  };
}
