import { SYNC_SCHEDULE_UTC_HOUR } from "@/constants/cron.constants";

const MINUTE = 60_000;

/**
 * Minutos que faltan para la próxima ejecución del cron diario, contados desde
 * `nowIso`. Depende solo de la hora programada, no de la última importación:
 * una sincronización a mano no adelanta ni retrasa el cron.
 */
export function minutesUntilNextSync(nowIso: string): number {
  const now = new Date(nowIso);
  const next = new Date(now);

  next.setUTCHours(SYNC_SCHEDULE_UTC_HOUR, 0, 0, 0);
  if (next.getTime() <= now.getTime()) next.setUTCDate(next.getUTCDate() + 1);

  return Math.ceil((next.getTime() - now.getTime()) / MINUTE);
}
