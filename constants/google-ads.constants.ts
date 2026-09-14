/**
 * Integración de Google Ads. A diferencia de Meta y TikTok, aquí no se pide
 * nada a una API: los datos llegan empujados por un script programado que corre
 * dentro de Google Ads y se depositan en un buzón común a todos los usuarios.
 */

/** Cabecera con la que el script se identifica ante el endpoint de ingesta. */
export const GOOGLE_ADS_INGEST_HEADER = "x-adsme-secret";

/** Ruta que recibe lo que exporta el script. */
export const GOOGLE_ADS_INGEST_PATH = "/api/google-ads/ingest";

/** Etiqueta de la conexión que adsme crea sola al sincronizar por primera vez. */
export const GOOGLE_ADS_ACCOUNT_LABEL = "Google Ads";

/**
 * Cuenta marcada en la conexión cuando no se acota ninguna: el buzón puede
 * traer varias subcuentas de la MCC y se materializan todas juntas.
 */
export const GOOGLE_ADS_ALL_ACCOUNTS = "all";

export const GOOGLE_ADS_ERRORS = {
  noData:
    "Todavía no ha llegado ningún dato del script de Google Ads. Revisa que el script esté programado y se haya ejecutado al menos una vez.",
  connectionFailed: "No se pudo preparar la conexión de Google Ads.",
  syncFailed: "No se pudieron importar las campañas de Google Ads.",
  dailyFailed:
    "Las campañas de Google Ads se importaron, pero la serie diaria no.",
} as const;
