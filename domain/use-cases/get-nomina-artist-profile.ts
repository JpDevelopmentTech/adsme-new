import type { NominaArtistProfile } from "@/domain/entities/nomina-profile";
import type { NominaRepository } from "@/domain/interfaces/nomina-repository";

/**
 * Caso de uso: perfil de un artista de la nómina. Devuelve `null` si el
 * artista no existe, para que la pantalla muestre «Artista no encontrado».
 */
export function createGetNominaArtistProfile(repository: NominaRepository) {
  return async function getNominaArtistProfile(
    artistId: string,
  ): Promise<NominaArtistProfile | null> {
    return repository.getArtistProfile(artistId);
  };
}
