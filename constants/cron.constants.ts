/** Ruta del cron de sincronización. Debe coincidir con `vercel.json`. */
export const CRON_SYNC_PATH = "/api/cron/sync";

/**
 * Horas UTC a las que corre la sincronización: cada 6 horas, a las 12 a. m.,
 * 6 a. m., 12 p. m. y 6 p. m. de Colombia. Son cuatro crons diarios en
 * `vercel.json` y no uno solo «cada 6 horas»: el plan Hobby limita cada cron a
 * una ejecución al día (si no, el deploy falla), pero admite hasta 100 crons.
 * Si se cambia una hora aquí, hay que cambiarla también allí.
 */
export const SYNC_SCHEDULE_UTC_HOURS: readonly number[] = [5, 11, 17, 23];

/** Minutos entre dos ejecuciones seguidas de la sincronización. */
export const SYNC_CYCLE_MINUTES = 6 * 60;

/**
 * Antigüedad a partir de la cual la última importación se da por atrasada: un
 * ciclo más dos horas de margen, porque en Hobby Vercel lanza el cron en
 * cualquier minuto de la hora programada.
 */
export const SYNC_STALE_AFTER_MINUTES = SYNC_CYCLE_MINUTES + 120;
