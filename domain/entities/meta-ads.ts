/** Token de acceso de Meta con su caducidad. */
export interface MetaToken {
  accessToken: string;
  /** Fecha ISO de caducidad, o `null` si Meta no la informó. */
  expiresAt: string | null;
}

/** Cuenta publicitaria accesible por el usuario. */
export interface MetaAdAccount {
  /** Identificador con prefijo, como `act_88213`. */
  id: string;
  /** Identificador numérico sin prefijo. */
  accountId: string;
  name: string;
}

/** Retención de vídeo por tramos, en número de reproducciones alcanzadas. */
export interface VideoRetention {
  p25: number;
  p50: number;
  p75: number;
  p100: number;
}

/** Métricas ya normalizadas de una campaña. */
export interface MetaCampaignMetrics {
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  videoPlays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
  videoRetention: VideoRetention;
}

/** Bloque `insights` tal como llega de la Graph API, con todo en cadenas. */
export interface MetaInsightsPayload {
  /** Campaña a la que pertenece la fila, para cruzarla con su campaña. */
  campaign_id?: string;
  spend?: string;
  impressions?: string;
  clicks?: string;
  reach?: string;
  actions?: { action_type?: string; value?: string | number }[];
  video_play_actions?: { value?: string | number }[];
  video_p25_watched_actions?: { value?: string | number }[];
  video_p50_watched_actions?: { value?: string | number }[];
  video_p75_watched_actions?: { value?: string | number }[];
  video_p100_watched_actions?: { value?: string | number }[];
}

/**
 * Fila de insights partida por día. `date_start` es el día del tramo: con
 * `time_increment=1` coincide siempre con `date_stop`.
 */
export interface MetaDailyInsightsPayload extends MetaInsightsPayload {
  date_start?: string;
}

/**
 * Campaña tal como la devuelve la Graph API. Es la forma de la respuesta de
 * Meta, no la entidad de adsme: esa es `Campaign`.
 */
export interface MetaCampaign extends MetaCampaignMetrics {
  id: string;
  name: string;
  status: string;
  objective: string | null;
  startsAt: string | null;
}
