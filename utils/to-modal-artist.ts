import type { NominaArtistProfile } from "@/domain/entities/nomina-profile";
import type { NominaModalArtist } from "@/types/nomina-modals.types";

/** Lo que necesitan los modales del perfil: el artista y su nómina, sin el resto. */
export function toModalArtist(profile: NominaArtistProfile): NominaModalArtist {
  return { id: profile.id, name: profile.name, photoUrl: profile.photoUrl, semaphore: profile.semaphore, nomina: profile.nomina };
}
