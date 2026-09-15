import type { ConnectionPlatform } from "@/domain/entities/connection";
import type { JobPlatform } from "@/domain/entities/job";
import type { PlatformConnection } from "@/domain/entities/platform-connection";

export const CONNECTIONS_COPY = {
  title: "Conexiones",
  subtitle:
    "Cuentas publicitarias desde las que adsme importa las métricas de tus campañas.",
  notLinked: "Sin vincular",
  accounts: (count: number) => (count === 1 ? "1 cuenta" : `${count} cuentas`),
  connected: "Conectado",
  disconnected: "Desconectado",
  notConnectedShort: "Sin conectar",
  disconnect: "Desconectar",
  manage: "Elegir cuentas",
  reauthorize: "Renovar acceso",
  connect: "Conectar cuenta",
  connectHint: "Pediremos acceso de solo lectura a tus reportes.",
  connectInvite: (platform: string) =>
    `Conecta tu cuenta de ${platform} para importar sus campañas.`,
  syncNow: "Sincronizar ahora",
  syncingTitle: "Importando tus campañas",
  syncingHint:
    "Estamos pidiendo las métricas a cada cuenta conectada. Tarda unos segundos.",
  panelTitle: "Cuentas conectadas",
  panelSubtitle:
    "De aquí salen las métricas de tus campañas. Solo pedimos lectura de reportes.",
  connectInviteShort: "Conéctala para importar sus campañas. Solo pedimos lectura de reportes.",
  actions: (platform: string) => `Acciones de ${platform}`,
  pendingOauth:
    "Requiere registrar la app OAuth de la plataforma (client ID, secret y developer token).",
} as const;

/** Textos del estado de la importación y del reloj de la banda. */
export const CONNECTIONS_SUMMARY_COPY = {
  never: "sin sincronizar",
  eyebrow: "Estado de la importación",
  nextLabel: "Próxima",
  minutes: "min",
  now: "ya",
  flowing: "Los datos están entrando",
  attention: "Hay un acceso que revisar",
  stopped: "Todavía no entra nada",
  accounts: (accounts: number, platforms: number) =>
    `${accounts} ${accounts === 1 ? "cuenta" : "cuentas"} en ${platforms} ${platforms === 1 ? "plataforma" : "plataformas"}`,
  campaigns: (count: number) =>
    `${count} ${count === 1 ? "campaña importada" : "campañas importadas"}`,
  lastSync: (relative: string) => `última importación ${relative}`,
  noAccounts: "Conecta una cuenta para empezar a importar campañas",
} as const;

/** Etiquetas de las micro-métricas y de la vigencia dentro de la tarjeta. */
export const CONNECTION_CARD_COPY = {
  campaigns: "Campañas",
  imported: "Importado",
  synced: "Sincronizado",
  /** La vigencia se afirma en vez de rotularse: dice el dato, no la categoría. */
  accessExpiring: (days: number) =>
    days === 0
      ? "El acceso ya caducó"
      : `El acceso caduca en ${days} ${days === 1 ? "día" : "días"}`,
  accessRenews: "El acceso se renueva solo",
  accessDays: (days: number) =>
    `Acceso vigente ${days} ${days === 1 ? "día" : "días"} más`,
} as const;

/** Cabeceras y textos de la tabla de campañas importadas. */
export const IMPORTED_CAMPAIGNS_COPY = {
  title: "Lo que ha entrado",
  subtitle: "Las últimas campañas importadas y a qué trabajo alimentan",
  seeAll: "Ver todas",
  unlinked: "Sin vincular",
  unlinkedCount: (count: number) =>
    count === 1 ? "1 sin vincular" : `${count} sin vincular`,
  columns: {
    campaign: "CAMPAÑA",
    account: "CUENTA",
    job: "TRABAJO",
    spend: "INVERSIÓN",
    synced: "IMPORTADA",
  },
} as const;

/**
 * Campo con el que el selector envía las cuentas marcadas. Es una casilla por
 * cuenta, así que el formulario manda tantos valores como cuentas elegidas.
 */
export const ACCOUNT_IDS_FIELD = "accountIds";

/**
 * Monograma del chip de cada fila. Aquí la plataforma se nombra por la consola
 * donde se concede el acceso —Google Ads, no YouTube—, así que no puede salir
 * del rótulo que usa el resto del producto.
 */
export const CONNECTION_MONOGRAMS: Record<JobPlatform, string> = {
  youtube: "GA",
  meta: "M",
  tiktok: "TT",
};

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

/**
 * Reparto de la fila de campañas importadas, en el mismo orden que
 * `IMPORTED_CAMPAIGNS_COPY.columns`. Va en porcentajes porque la tabla es
 * `table-fixed`: así cabecera y filas comparten eje sin fijar un ancho en px.
 */
export const IMPORTED_TABLE_WIDTHS = [
  "38.4%",
  "19.8%",
  "21.6%",
  "10.5%",
  "9.7%",
] as const;

/** Filas de la tabla de campañas importadas; el resto se ve en `B9`. */
export const IMPORTED_CAMPAIGNS_LIMIT = 6;

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
    accountNames: [],
    activeCampaigns: null,
    importedSpend: null,
    lastSyncedLabel: null,
    access: null,
  },
];
