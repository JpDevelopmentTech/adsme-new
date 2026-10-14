import type { NominaRosterEntry } from "@/domain/entities/nomina-roster";
import type { NominaRepository } from "@/domain/interfaces/nomina-repository";

/**
 * Caso de uso: artistas del roster de la Nómina Plan, en orden de alta.
 */
export function createListNominaRoster(repository: NominaRepository) {
  return async function listNominaRoster(): Promise<NominaRosterEntry[]> {
    return repository.listRoster();
  };
}
