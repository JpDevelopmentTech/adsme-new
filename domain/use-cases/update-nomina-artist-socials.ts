import type { NominaSocialLink } from "@/domain/entities/nomina-social";
import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaEnrollmentRepository } from "@/domain/interfaces/nomina-enrollment-repository";

/** Caso de uso: guardar las redes del artista; las vacías no se guardan. */
export function createUpdateNominaArtistSocials(repository: NominaEnrollmentRepository) {
  return async function updateNominaArtistSocials(clientId: string, socials: NominaSocialLink[]): Promise<NominaResult<null>> {
    return repository.updateSocials(clientId, socials.filter((link) => link.url?.trim()));
  };
}
