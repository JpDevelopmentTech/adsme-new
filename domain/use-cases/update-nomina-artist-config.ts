import type { NominaSplitTerms } from "@/domain/entities/nomina-split-terms";
import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaEnrollmentRepository } from "@/domain/interfaces/nomina-enrollment-repository";

/** Caso de uso: cambiar el mínimo de shows y el modelo de reparto de un artista. Aplica a los ingresos que se registren desde ahora. */
export function createUpdateNominaArtistConfig(repository: NominaEnrollmentRepository) {
  return async function updateNominaArtistConfig(clientId: string, minShows: number, split: NominaSplitTerms): Promise<NominaResult<null>> {
    return repository.updateConfig(clientId, minShows, split);
  };
}
