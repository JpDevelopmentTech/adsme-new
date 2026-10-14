import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { NominaRepository } from "@/domain/interfaces/nomina-repository";

/**
 * Caso de uso: finanzas del roster en el periodo por defecto (últimos 6 meses).
 */
export function createGetNominaFinance(repository: NominaRepository) {
  return async function getNominaFinance(): Promise<NominaFinance> {
    return repository.getFinance();
  };
}
