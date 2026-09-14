/**
 * Acceso concedido por TikTok. La documentación del SDK describe tokens de 24 h
 * con refresco, pero eso aplica al token de creador; el de anunciante puede
 * llegar sin caducidad. Ambos casos se modelan aquí: sin `expiresAt` el acceso
 * no expira y la rama de renovación nunca se ejecuta.
 */
export interface TiktokToken {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: string | null;
  /** Cuentas que el usuario autorizó, tal como vienen en el canje. */
  advertiserIds: string[];
}

/** Cuenta de anunciante accesible con el permiso concedido. */
export interface TiktokAdvertiser {
  id: string;
  name: string;
  /** Moneda de la cuenta; TikTok reporta el gasto en ella, no en la del negocio. */
  currency: string | null;
}

/** Retención de vídeo por tramos, en número de reproducciones alcanzadas. */
export interface TiktokVideoRetention {
  p25: number;
  p50: number;
  p75: number;
  p100: number;
}

/** Métricas ya normalizadas de una campaña de TikTok. */
export interface TiktokCampaignMetrics {
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  videoPlays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
  videoRetention: TiktokVideoRetention;
}

/**
 * Campaña tal como la reconstruye adsme cruzando el listado de campañas con el
 * informe agregado. No es la respuesta cruda de TikTok, que llega partida.
 */
export interface TiktokCampaign extends TiktokCampaignMetrics {
  id: string;
  name: string;
  status: string;
  objective: string | null;
  startsAt: string | null;
}
