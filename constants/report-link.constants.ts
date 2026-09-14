/** Prefijo de la ruta pública del reporte compartido con el artista. */
export const REPORT_ROUTE_PREFIX = "/r";

/** Segmento del reporte consolidado del artista, colgado del mismo enlace. */
export const REPORT_ARTIST_SEGMENT = "artista";

/** Parámetro con el que las pestañas filtran el reporte por plataforma. */
export const REPORT_PLATFORM_PARAM = "plataforma";

/** Algoritmo de firma de los enlaces de reporte. */
export const REPORT_TOKEN_ALGORITHM = "HS256";

/** Emisor y audiencia del token, para que no sirva en otro contexto de la app. */
export const REPORT_TOKEN_ISSUER = "adsme";

export const REPORT_TOKEN_AUDIENCE = "adsme-report";

/** Parámetro con el que la pantalla de clave reintenta la apertura. */
export const REPORT_PASSWORD_FIELD = "clave";

/**
 * Cookie por enlace con el token ya validado. Es por código para que acertar la
 * clave de un reporte no abra los demás.
 */
export function reportSessionCookie(code: string): string {
  return `adsme-report-${code}`;
}

/** Duración de esa sesión: una jornada, para no pedir la clave en cada visita. */
export const REPORT_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

export const REPORT_GATE_COPY = {
  title: "Reporte protegido",
  body: (job: string) =>
    `Pídele la clave a tu equipo de adsme para ver los resultados de ${job}.`,
  fallbackBody:
    "Pídele la clave a tu equipo de adsme para ver los resultados de este lanzamiento.",
  placeholder: "Clave del reporte",
  submit: "Ver reporte",
  help: "El enlace es privado: la clave la define quien lo compartió.",
  invalid: "La clave no es correcta. Inténtalo de nuevo.",
  expiredTitle: "Enlace expirado",
  expiredBody:
    "Este enlace tenía fecha de caducidad y ya pasó. Pide uno nuevo a quien gestiona tus campañas.",
  expiredCode: "Error 410 · enlace expirado",
} as const;

export const REPORT_LINK_COPY = {
  copy: "Copiar enlace del reporte",
  regenerate: "Regenerar enlace",
  regenerateTitle: "Regenerar enlace del reporte",
  regenerateDescription: (title: string) =>
    `El enlace actual de «${title}» dejará de funcionar de inmediato y quien lo tenga guardado ya no podrá abrir el reporte.`,
  confirm: "Regenerar",
  cancel: "Cancelar",
  invalidTitle: "Enlace no válido",
  invalidBody:
    "Este enlace no existe, caducó o fue regenerado. Pide uno nuevo a quien gestiona tus campañas.",
} as const;
