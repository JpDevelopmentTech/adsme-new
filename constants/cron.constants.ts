/** Ruta del cron diario de sincronización. Debe coincidir con `vercel.json`. */
export const CRON_SYNC_PATH = "/api/cron/sync";

/**
 * Hora UTC a la que corre el cron (`0 11 * * *` en `vercel.json`): las 6:00 de
 * Colombia, después de que el script de Google deje su exportación nocturna y
 * antes de que nadie abra un reporte. Si cambia aquí, hay que cambiarla allí.
 */
export const SYNC_SCHEDULE_UTC_HOUR = 11;

/** Cada cuánto vuelve a correr el cron: una vez al día. */
export const SYNC_CYCLE_MINUTES = 24 * 60;

/**
 * Antigüedad a partir de la cual la última importación se da por atrasada: un
 * ciclo más dos horas de margen, porque Vercel puede lanzar el cron en
 * cualquier minuto de la hora programada.
 */
export const SYNC_STALE_AFTER_MINUTES = SYNC_CYCLE_MINUTES + 120;
