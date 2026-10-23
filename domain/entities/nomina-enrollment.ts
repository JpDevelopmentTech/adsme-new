import type { NominaArtistConfig } from "@/domain/entities/nomina-artist-config";
import type { NominaSocialLink } from "@/domain/entities/nomina-social";

/** Cliente inscrito en Nómina: su identidad, sus redes y su configuración. */
export interface NominaEnrollment {
  clientId: string;
  name: string;
  avatarUrl: string | null;
  socials: NominaSocialLink[];
  config: NominaArtistConfig;
}
