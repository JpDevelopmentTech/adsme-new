/**
 * TRM histórica publicada por la Superintendencia Financiera en datos abiertos
 * (datos.gov.co, conjunto 32sa-8pi3). Es gratuita y no exige clave. Cada fila
 * trae `valor`, `vigenciadesde` y `vigenciahasta`; la de un viernes cubre
 * también el fin de semana.
 */
export const TRM_API_URL = "https://www.datos.gov.co/resource/32sa-8pi3.json";

/** Etiqueta con la que se guarda el origen de la tasa. */
export const TRM_SOURCE = "datos.gov.co/32sa-8pi3";

/** La TRM es el precio en pesos de un dólar. */
export const TRM_CURRENCY = "USD";

/** Zona en la que rige la TRM y en la que se decide qué día es «hoy». */
export const REPORTING_TIME_ZONE = "America/Bogota";

/** Tiempo máximo de espera a datos.gov.co antes de dar la consulta por fallida. */
export const TRM_TIMEOUT_MS = 10_000;

export const EXCHANGE_RATE_ERRORS = {
  refreshFailed: (reason: string) =>
    `No se pudo actualizar la TRM (${reason}); el gasto en dólares se convierte con la última guardada.`,
} as const;
