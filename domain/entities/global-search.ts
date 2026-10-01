import type { ClientAvatarGradient } from "@/domain/entities/client";
import type { ConnectionPlatform } from "@/domain/entities/connection";

/** Cliente encontrado por el buscador global: lo justo para pintarlo en la lista. */
export interface ClientSearchHit {
  id: string;
  name: string;
  handle: string;
  kind: string;
  initials: string;
  gradient: ClientAvatarGradient;
  avatarUrl: string | null;
}

/** Trabajo encontrado por el buscador global. */
export interface JobSearchHit {
  id: string;
  title: string;
  artistName: string;
  coverUrl: string | null;
}

/** Campaña importada encontrada por el buscador global. */
export interface CampaignSearchHit {
  id: string;
  name: string;
  externalCampaignId: string;
  platform: ConnectionPlatform;
}

/** Resultados del buscador global, agrupados por tipo y ya recortados. */
export interface GlobalSearchResults {
  clients: ClientSearchHit[];
  jobs: JobSearchHit[];
  campaigns: CampaignSearchHit[];
}
