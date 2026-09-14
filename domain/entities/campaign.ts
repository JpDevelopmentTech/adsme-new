import type { ConnectionPlatform } from "@/domain/entities/connection";

/**
 * Campaña importada de una plataforma. `externalCampaignId` es su identificador
 * real allí, y `jobId` la vincula con un trabajo de adsme —y por tanto con su
 * cliente— cuando el administrador hace esa asociación.
 */
export interface Campaign {
  id: string;
  connectionId: string;
  platform: ConnectionPlatform;
  externalCampaignId: string;
  jobId: string | null;
  name: string;
  /** Estado tal como lo reporta la plataforma (`ACTIVE`, `PAUSED`…). */
  status: string;
  objective: string | null;
  spend: number;
  impressions: number;
  clicks: number;
  /** Personas únicas alcanzadas; siempre menor o igual que las impresiones. */
  reach: number;
  /** Inicios de reproducción, sin contar repeticiones. */
  videoPlays: number;
  /** Interacción total con la publicación, según la reporta la plataforma. */
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
  startsAt: string | null;
  endsAt: string | null;
  /** Datos específicos de la plataforma, como la retención de vídeo por tramos. */
  extra: Record<string, unknown>;
  syncedAt: string;
}

/** Campos que se escriben al importar una campaña desde la plataforma. */
export interface CampaignDraft {
  connectionId: string;
  externalCampaignId: string;
  name: string;
  status: string;
  objective?: string | null;
  spend?: number;
  impressions?: number;
  clicks?: number;
  reach?: number;
  videoPlays?: number;
  engagement?: number;
  comments?: number;
  shares?: number;
  reactions?: number;
  startsAt?: string | null;
  endsAt?: string | null;
  extra?: Record<string, unknown>;
}

/** Criterios del listado de campañas. */
export interface CampaignListQuery {
  search: string;
  connectionId: string | "all";
  /** `linked` y `unlinked` filtran por si la campaña tiene trabajo asociado. */
  link: "all" | "linked" | "unlinked";
}

export const DEFAULT_CAMPAIGN_LIST_QUERY: CampaignListQuery = {
  search: "",
  connectionId: "all",
  link: "all",
};
