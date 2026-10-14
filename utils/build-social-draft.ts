import { SOCIAL_NETWORKS } from "@/constants/nomina-modales-redes.constants";
import type { NominaSocialLink } from "@/domain/entities/nomina-social";
import type { NominaSocialDraft } from "@/types/nomina-modales-perfil.types";

/** Enlaces del artista por red, con cadena vacía en las que no tiene. */
export function buildSocialDraft(socials: NominaSocialLink[]): NominaSocialDraft {
  return Object.fromEntries(
    SOCIAL_NETWORKS.map(({ key }) => [key, socials.find((link) => link.network === key)?.url ?? ""]),
  ) as NominaSocialDraft;
}
