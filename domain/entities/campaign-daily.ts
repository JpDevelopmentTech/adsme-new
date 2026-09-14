import type { JobPlatform } from "@/domain/entities/job";

/**
 * Métricas de una campaña en un día concreto. Es la serie que `campaigns` no
 * guarda: allí solo hay acumulados de toda la vida de la campaña.
 */
export interface CampaignDailyMetrics {
  spend: number;
  impressions: number;
  clicks: number;
  /** Personas únicas de ese día; no es sumable entre días. */
  reach: number;
  videoPlays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
}

/**
 * Un día tal como lo entrega la plataforma, todavía sin resolver a qué campaña
 * de adsme pertenece: viene identificado por el id externo.
 */
export interface CampaignDayInsight extends CampaignDailyMetrics {
  externalCampaignId: string;
  /** Fecha del dato en `YYYY-MM-DD`, en la zona de la cuenta publicitaria. */
  date: string;
  /** Datos propios de la plataforma, como la retención de vídeo por tramos. */
  extra: Record<string, unknown>;
}

/** Fila que se escribe en la serie diaria, ya resuelta la campaña de adsme. */
export interface CampaignDailyDraft extends CampaignDailyMetrics {
  campaignId: string;
  date: string;
  extra: Record<string, unknown>;
}

/** Un día de la serie con la plataforma y el trabajo a los que pertenece. */
export interface CampaignDailyPoint extends CampaignDailyMetrics {
  date: string;
  platform: JobPlatform;
  /** Trabajo al que está vinculada la campaña; `null` si no lo está. */
  jobId: string | null;
}

/** Rango cerrado de fechas ISO sobre el que se pide la serie. */
export interface DailyRange {
  from: string;
  to: string;
}
