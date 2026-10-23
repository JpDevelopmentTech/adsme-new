import type { NominaArtistProfile } from "@/domain/entities/nomina-profile";
import type { NominaModalArtist } from "@/types/nomina-modals.types";
import { toBillingEntry } from "@/utils/to-billing-entry";

/** Lo que necesitan los modales del perfil: el artista, su nómina, su modelo y sus ingresos. */
export function toModalArtist(profile: NominaArtistProfile): NominaModalArtist {
  return {
    id: profile.id,
    name: profile.name,
    photoUrl: profile.photoUrl,
    semaphore: profile.semaphore,
    nomina: profile.nomina,
    minShows: profile.config.minShows,
    split: profile.config.split,
    billing: profile.movements.map(toBillingEntry),
  };
}
