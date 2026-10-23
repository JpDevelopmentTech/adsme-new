import type { NominaArtistConfig } from "@/domain/entities/nomina-artist-config";
import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaEnrollmentRepository } from "@/domain/interfaces/nomina-enrollment-repository";

/** Caso de uso: inscribir un cliente en Nómina con su configuración. */
export function createEnrollNominaArtist(repository: NominaEnrollmentRepository) {
  return async function enrollNominaArtist(config: NominaArtistConfig): Promise<NominaResult<NominaArtistConfig>> {
    return repository.enroll(config);
  };
}
