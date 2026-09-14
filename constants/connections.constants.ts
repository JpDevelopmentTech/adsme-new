import type { ConnectionPlatform } from "@/domain/entities/connection";
import type { PlatformConnection } from "@/domain/entities/platform-connection";

export const CONNECTIONS_COPY = {
  title: "Conexiones",
  subtitle:
    "Cuentas publicitarias desde las que adsme importa las métricas de tus campañas.",
  notLinked: "Sin vincular",
  connected: "Conectado",
  disconnected: "Desconectado",
  disconnect: "Desconectar",
  manage: "Administrar",
  reauthorize: "Reautorizar",
  connect: "Conectar con OAuth",
  connectHint: "Pediremos acceso de solo lectura a tus reportes.",
  connectInvite: (platform: string) =>
    `Conecta tu cuenta de ${platform} para importar sus campañas.`,
  syncNow: "Sincronizar ahora",
  pendingOauth:
    "Requiere registrar la app OAuth de la plataforma (client ID, secret y developer token).",
} as const;

/** Cifras de la banda de cabecera. */
export const CONNECTIONS_SUMMARY_COPY = {
  connectedAccounts: "Cuentas conectadas",
  importedCampaigns: "Campañas importadas",
  lastSync: "Última sincronización",
  nextSync: "Próxima sincronización",
  never: "sin sincronizar",
} as const;

/** Etiquetas de las micro-métricas y de la vigencia dentro de la tarjeta. */
export const CONNECTION_CARD_COPY = {
  campaigns: "Campañas",
  imported: "Importado",
  synced: "Sincronizado",
  access: "Vigencia del acceso",
  accessExpiring: "El acceso caduca pronto",
  accessNoExpiry: "Sin caducidad",
  accessExpired: "Acceso caducado",
  days: (count: number) => (count === 1 ? "1 día" : `${count} días`),
} as const;

/** Cabeceras y textos de la tabla de campañas importadas. */
export const IMPORTED_CAMPAIGNS_COPY = {
  title: "Campañas importadas",
  seeAll: "Ver todas",
  unlinked: "Sin vincular",
  columns: {
    campaign: "CAMPAÑA",
    account: "CUENTA",
    job: "TRABAJO",
    spend: "INVERSIÓN",
    synced: "IMPORTADA",
  },
} as const;

/** Días de antelación con los que se avisa de que un token va a caducar. */
export const TOKEN_WARNING_DAYS = 7;

/**
 * Duración nominal del token de larga duración de cada plataforma. Fija la
 * escala de la barra de vigencia: sin ella, «quedan 4 días» no dice si es mucho
 * o poco.
 */
export const TOKEN_LIFETIME_DAYS: Record<ConnectionPlatform, number> = {
  google_ads: 90,
  meta: 60,
  tiktok: 365,
};

/**
 * Plataformas cuyo acceso se renueva solo con un refresh token. Su
 * `token_expires_at` mide el token de acceso, que dura horas, no el permiso
 * concedido: sin esta distinción la tarjeta diría siempre «caduca pronto» y el
 * dashboard emitiría una alerta de caducidad cada hora.
 */
export const TOKEN_RENEWS_ITSELF: Record<ConnectionPlatform, boolean> = {
  google_ads: true,
  meta: false,
  tiktok: true,
};

/** Cadencia con la que adsme reimporta las métricas de las cuentas conectadas. */
export const SYNC_INTERVAL_MINUTES = 60;

/** Filas de la tabla de campañas importadas; el resto se ve en `B9`. */
export const IMPORTED_CAMPAIGNS_LIMIT = 6;

/** Colores del chip de cada plataforma, tomados de los tokens del `.pen`. */
export const CONNECTION_CHIPS = {
  youtube: "bg-yt/12 text-yt",
  meta: "bg-meta/12 text-meta",
  tiktok: "bg-tiktok-pink/12 text-tiktok-pink",
} as const;

/**
 * Conexiones de muestra copiadas de `B10 · Conexiones`. Son datos del diseño,
 * no cuentas reales: solo quedan aquí las plataformas cuya app OAuth todavía no
 * existe. Meta y TikTok ya son reales y salieron de esta lista.
 */
export const MOCK_CONNECTIONS: PlatformConnection[] = [
  {
    platform: "youtube",
    name: "Google Ads",
    status: "disconnected",
    accountName: null,
    activeCampaigns: null,
    importedSpend: null,
    lastSyncedLabel: null,
    access: null,
  },
];
