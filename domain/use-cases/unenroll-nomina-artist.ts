import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaEnrollmentRepository } from "@/domain/interfaces/nomina-enrollment-repository";

/** Caso de uso: sacar a un artista de Nómina sin borrar el cliente. */
export function createUnenrollNominaArtist(repository: NominaEnrollmentRepository) {
  return async function unenrollNominaArtist(clientId: string): Promise<NominaResult<null>> {
    return repository.unenroll(clientId);
  };
}
