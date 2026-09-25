/** Versión de la Marketing API contra la que se integra adsme. */
export const TIKTOK_API_VERSION = "v1.3";

export const TIKTOK_API_URL = `https://business-api.tiktok.com/open_api/${TIKTOK_API_VERSION}`;

/** Pantalla de consentimiento del portal de TikTok for Business. */
export const TIKTOK_AUTH_URL = "https://business-api.tiktok.com/portal/auth";

export const TIKTOK_CALLBACK_PATH = "/auth/tiktok/callback";

/** Cookie efímera con el `state` del OAuth, para cortar CSRF en la vuelta. */
export const TIKTOK_STATE_COOKIE = "adsme-tiktok-state";

export const TIKTOK_STATE_MAX_AGE_SECONDS = 600;

/** Marca en la URL con la que la vuelta del OAuth pide elegir cuenta. */
export const TIKTOK_PICK_ACCOUNT_PARAM = "cuenta-tiktok";

export const TIKTOK_PICK_ACCOUNT_VALUE = "elegir";

/** Misma marca cuando quien abre el selector es el menú de la conexión. */
export const TIKTOK_PICK_ACCOUNT_MANAGE = "gestionar";

/** Margen con el que se renueva el token antes de que caduque de verdad. */
export const TIKTOK_TOKEN_SKEW_SECONDS = 300;

/**
 * TikTok separa metadatos y métricas en dos endpoints, así que hay que pedir
 * ambos y cruzarlos por `campaign_id`. Un informe no devuelve el nombre ni las
 * fechas de la campaña, y el listado no devuelve ni una métrica.
 */
export const TIKTOK_CAMPAIGN_FIELDS = [
  "campaign_id",
  "campaign_name",
  "operation_status",
  "objective_type",
  "create_time",
  "modify_time",
];

/** Métricas del informe agregado por campaña. */
export const TIKTOK_REPORT_METRICS = [
  "spend",
  "impressions",
  "clicks",
  "reach",
  "video_play_actions",
  "video_watched_2s",
  "video_views_p25",
  "video_views_p50",
  "video_views_p75",
  "video_views_p100",
  "likes",
  "comments",
  "shares",
];

/** Informe básico agregado por campaña, sin segmentar por día. */
export const TIKTOK_REPORT_TYPE = "BASIC";

export const TIKTOK_REPORT_DATA_LEVEL = "AUCTION_CAMPAIGN";

export const TIKTOK_REPORT_DIMENSIONS = ["campaign_id"];

/**
 * Dimensiones del mismo informe partido por día. Añadir `stat_time_day` es lo
 * que convierte una fila por campaña en una por campaña y jornada.
 */
export const TIKTOK_REPORT_DAILY_DIMENSIONS = ["campaign_id", "stat_time_day"];

/**
 * Ventana máxima que TikTok admite con desglose diario. Es un límite duro de la
 * API —«max time span is 30 days when use stat_time_day»—, así que un histórico
 * más largo hay que pedirlo en tramos encadenados.
 */
export const TIKTOK_DAILY_MAX_RANGE_DAYS = 30;

/** Histórico que se importa la primera vez, a la par que el que trae Meta. */
export const TIKTOK_DAILY_HISTORY_DAYS = 730;

/**
 * Tope de tramos por sincronización. Con ventanas de 30 días cubre el histórico
 * entero; existe para que un rango absurdo no encadene peticiones sin fin.
 */
export const TIKTOK_DAILY_MAX_WINDOWS = 26;

/**
 * Tramos que se piden a la vez. En serie, veinticinco ventanas alargan el sync
 * más de lo que aguanta una Server Action; de golpe, TikTok responde con error
 * de cuota. Una tanda corta cabe de sobra bajo su límite por segundo.
 */
export const TIKTOK_DAILY_CONCURRENCY = 4;

/** Tope de páginas dentro de un mismo tramo. */
export const TIKTOK_DAILY_MAX_PAGES = 20;

/** Tope de filas por página; una cuenta rara vez supera este número. */
export const TIKTOK_PAGE_SIZE = 200;

/**
 * Informe de audiencia: el reparto por sexo y edad de cada campaña. Es otro
 * `report_type` del mismo endpoint, no otro endpoint.
 */
export const TIKTOK_AUDIENCE_REPORT_TYPE = "AUDIENCE";

export const TIKTOK_AUDIENCE_DIMENSIONS = ["campaign_id", "gender", "age"];

/**
 * Solo impresiones: es la única métrica que las tres plataformas dan por
 * desglose, y las tarjetas del reporte son porcentajes.
 */
export const TIKTOK_AUDIENCE_METRICS = ["impressions"];

/**
 * Pide el acumulado de toda la vida de la campaña en vez de un rango. El
 * reparto de la tarjeta es del lanzamiento entero, así que encadenar ventanas
 * de 30 días como en la serie diaria sería trabajo para nada.
 */
export const TIKTOK_LIFETIME_QUERY = "true";

export const TIKTOK_AUDIENCE_MAX_PAGES = 20;

export const TIKTOK_ACCOUNT_COPY = {
  title: "Elige tus cuentas de anunciante",
  subtitle:
    "adsme importará las campañas de todas las cuentas que marques. Puedes cambiarlas cuando quieras.",
  confirm: "Guardar cuentas",
  cancel: "Cancelar",
  loading: "Consultando tus cuentas en TikTok…",
  empty:
    "TikTok no devolvió ninguna cuenta de anunciante para este acceso. Revisa que la app tenga concedidos los permisos de gestión de cuentas.",
  warning:
    "Las cuentas que desmarques se desconectarán y se eliminarán sus campañas importadas. Las que estuvieran vinculadas a un trabajo perderán ese vínculo y habrá que volver a asociarlas.",
  pickAfterConnect:
    "Tienes varias cuentas de anunciante en TikTok. Marca todas aquellas de las que quieras importar campañas.",
} as const;

export const TIKTOK_ERRORS = {
  notConfigured:
    "Falta configurar la app de TikTok (TIKTOK_APP_ID y TIKTOK_APP_SECRET).",
  stateMismatch:
    "La respuesta de TikTok no coincide con la solicitud. Vuelve a intentarlo.",
  exchangeFailed: "TikTok rechazó la autorización. Vuelve a intentarlo.",
  noAdvertisers:
    "La cuenta autorizada no tiene cuentas de anunciante accesibles. Revisa que hayas concedido los permisos de gestión de cuentas.",
  advertisersFailed: "TikTok no pudo devolver tus cuentas de anunciante.",
  unknownAdvertiser:
    "Alguna de esas cuentas de anunciante ya no está entre las que autorizaste en TikTok.",
  noAccountsSelected:
    "Marca al menos una cuenta de anunciante. Para dejar de importar de TikTok usa Desconectar.",
  accountsUpdateFailed: "No pudimos guardar las cuentas de anunciante elegidas.",
  syncFailed: "No pudimos importar las campañas de TikTok.",
  breakdownsFailed:
    "Importamos las campañas, pero no pudimos actualizar el reparto por audiencia.",
  dailyFailed:
    "Importamos las campañas, pero no pudimos actualizar su histórico día a día.",
  notConnected: "Conecta TikTok Ads antes de sincronizar.",
  needsReauthorization:
    "El acceso a TikTok dejó de ser válido. Reautoriza la cuenta para volver a importar campañas.",
} as const;
