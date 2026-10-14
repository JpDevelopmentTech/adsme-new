import type { NominaOverview } from "@/domain/entities/nomina-overview";
import type { NominaRepository } from "@/domain/interfaces/nomina-repository";

/**
 * Caso de uso: resumen del mes en curso de la Nómina Plan: KPIs, rendimiento, distribución y top de artistas.
 */
export function createGetNominaOverview(repository: NominaRepository) {
  return async function getNominaOverview(): Promise<NominaOverview> {
    return repository.getOverview();
  };
}
