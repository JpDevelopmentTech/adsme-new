/**
 * Días ya importados que se vuelven a pedir en cada sincronización. Las
 * plataformas siguen ajustando las cifras de una fecha durante los días
 * posteriores (atribución tardía, tráfico inválido descontado), así que quedarse
 * con la primera lectura dejaría la serie por debajo de lo real.
 */
export const DAILY_LOOKBACK_DAYS = 7;

/** Milisegundos de un día, para mover fechas ISO sin pasar por la zona horaria. */
export const DAY_IN_MS = 86_400_000;
