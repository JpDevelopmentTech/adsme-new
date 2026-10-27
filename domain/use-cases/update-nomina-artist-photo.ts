import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaEnrollmentRepository } from "@/domain/interfaces/nomina-enrollment-repository";

/** Caso de uso: cambiar la foto del artista, que es la de su ficha de cliente. */
export function createUpdateNominaArtistPhoto(repository: NominaEnrollmentRepository) {
  return async function updateNominaArtistPhoto(clientId: string, avatarUrl: string | null): Promise<NominaResult<null>> {
    return repository.updatePhoto(clientId, avatarUrl);
  };
}
