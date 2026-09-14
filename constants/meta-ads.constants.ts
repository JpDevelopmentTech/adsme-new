/** Versión de la Graph API contra la que se integra adsme. */
export const META_GRAPH_VERSION = "v25.0";

export const META_GRAPH_URL = `https://graph.facebook.com/${META_GRAPH_VERSION}`;

export const META_DIALOG_URL = `https://www.facebook.com/${META_GRAPH_VERSION}/dialog/oauth`;

/**
 * Solo lectura: adsme importa métricas, nunca modifica campañas del cliente.
 * `business_management` no da permiso de escritura: hace falta para que
 * `/me/adaccounts` liste las cuentas que cuelgan de un Business Manager, que de
 * lo contrario vuelven vacías aunque el usuario las administre.
 */
export const META_SCOPES = ["ads_read", "business_management"] as const;

export const META_CALLBACK_PATH = "/auth/meta/callback";

/**
 * Obliga a Meta a mostrar de nuevo el diálogo de permisos aunque ya se hayan
 * concedido antes. Es la única forma de volver a la pantalla donde se eligen
 * las cuentas publicitarias a las que se da acceso.
 */
export const META_AUTH_TYPE = "rerequest";

/** Campos con los que se identifica una cuenta publicitaria. */
export const META_AD_ACCOUNT_FIELDS = "id,name,account_id";

/** Tope de cuentas y negocios por página; nadie administra tantos. */
export const META_ACCOUNTS_LIMIT = "200";

/**
 * Aristas donde viven las cuentas de un Business Manager. `/me/adaccounts` solo
 * devuelve aquellas en las que el usuario tiene un rol directo, así que las
 * cuentas administradas a través de un negocio hay que pedirlas por aquí: las
 * propias del negocio y las de sus clientes (agencias).
 */
export const META_BUSINESS_ACCOUNT_EDGES = [
  "owned_ad_accounts",
  "client_ad_accounts",
] as const;

/** Cookie efímera con el `state` del OAuth, para cortar CSRF en la vuelta. */
export const META_STATE_COOKIE = "adsme-meta-state";

export const META_STATE_MAX_AGE_SECONDS = 600;

/** Campos de campaña que se piden a la Graph API. */
export const META_CAMPAIGN_FIELDS = [
  "id",
  "name",
  "status",
  "objective",
  "start_time",
].join(",");

/**
 * Métricas por campaña que se piden a insights. `actions` y `video_*` no son
 * escalares: llegan como listas de pares `action_type`/`value` que hay que
 * desglosar (ver `meta-insights-mapper`).
 */
export const META_INSIGHT_FIELDS = [
  "campaign_id",
  "spend",
  "impressions",
  "clicks",
  "reach",
  "actions",
  "video_play_actions",
  "video_p25_watched_actions",
  "video_p50_watched_actions",
  "video_p75_watched_actions",
  "video_p100_watched_actions",
].join(",");

/**
 * Rango de las métricas que se importan. Sin esto Meta aplica su valor por
 * defecto —los últimos 30 días—, así que una campaña terminada hace más de un
 * mes llegaba con todo a cero. `maximum` es el histórico completo que la API
 * permite consultar, unos 37 meses hacia atrás.
 */
export const META_INSIGHTS_DATE_PRESET = "maximum";

/** Insights agregados por campaña, no por anuncio. */
export const META_INSIGHTS_LEVEL = "campaign";

/** Tope de filas de insights por página; una cuenta rara vez supera este número. */
export const META_INSIGHTS_LIMIT = "500";

/**
 * Parte los insights en un tramo por día. Es lo que convierte una fila por
 * campaña —el acumulado de toda su vida— en la serie que dibujan las gráficas.
 */
export const META_INSIGHTS_TIME_INCREMENT = "1";

/**
 * Campos de la serie diaria: los mismos de siempre más la fecha del tramo, sin
 * la cual las filas no se podrían situar en el tiempo.
 */
export const META_DAILY_INSIGHT_FIELDS = `${META_INSIGHT_FIELDS},date_start`;

/**
 * Tope de páginas que se recorren en una importación diaria. Con un tramo por
 * campaña y día, una cuenta antigua encadena muchas páginas; el límite evita
 * que un sync se quede horas paginando.
 */
export const META_DAILY_MAX_PAGES = 60;

/**
 * Tipos de acción de Meta que interesan. Los nombres no son evidentes: las
 * compartidas llegan como `post` y las reacciones como `post_reaction`.
 */
export const META_ACTION_TYPES = {
  comments: "comment",
  shares: "post",
  reactions: "post_reaction",
  engagement: "post_engagement",
} as const;

/**
 * Marca en la URL con la que la vuelta del OAuth pide elegir cuenta. Solo se
 * añade cuando el usuario tiene más de una: con una sola no hay nada que elegir.
 */
export const META_PICK_ACCOUNT_PARAM = "cuenta";

export const META_PICK_ACCOUNT_VALUE = "elegir";

export const META_ACCOUNT_COPY = {
  current: "Importando de",
  change: "Cambiar cuenta",
  title: "Elige la cuenta publicitaria",
  subtitle:
    "adsme importará las campañas de la cuenta que elijas. Puedes cambiarla cuando quieras.",
  confirm: "Usar esta cuenta",
  cancel: "Cancelar",
  loading: "Consultando tus cuentas en Meta…",
  empty:
    "Meta no devolvió ninguna cuenta para este acceso. Vuelve a Reautorizar y, en la pantalla de Meta, marca las cuentas publicitarias a las que quieres dar acceso.",
  warning:
    "Al cambiar de cuenta se eliminan las campañas importadas de la anterior. Las que estuvieran vinculadas a un trabajo perderán ese vínculo y habrá que volver a asociarlas.",
  pickAfterConnect:
    "Tienes varias cuentas publicitarias en Meta. Elige de cuál quieres importar las campañas.",
} as const;

export const META_ERRORS = {
  notConfigured:
    "Falta configurar la app de Meta (META_APP_ID y META_APP_SECRET).",
  stateMismatch: "La respuesta de Meta no coincide con la solicitud. Vuelve a intentarlo.",
  exchangeFailed: "Meta rechazó la autorización. Vuelve a intentarlo.",
  noAdAccounts:
    "La cuenta autorizada no tiene cuentas publicitarias accesibles. Si las tuyas están en un Business Manager, revisa que hayas aceptado el permiso de gestión del negocio.",
  adAccountsFailed: "Meta no pudo devolver tus cuentas publicitarias.",
  unknownAdAccount:
    "Esa cuenta publicitaria ya no está entre las que autorizaste en Meta.",
  accountSwitchFailed: "No pudimos cambiar la cuenta publicitaria.",
  syncFailed: "No pudimos importar las campañas de Meta.",
  dailyFailed:
    "Importamos las campañas, pero no pudimos actualizar su histórico día a día.",
  notConnected: "Conecta Meta Ads antes de sincronizar.",
  tokenExpired:
    "El token de Meta caducó. Reautoriza la cuenta para volver a importar campañas.",
} as const;
