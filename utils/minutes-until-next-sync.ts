import { SYNC_SCHEDULE_UTC_HOURS } from "@/constants/cron.constants";

const MINUTE = 60_000;

/**
 * Minutos que faltan para la próxima sincronización programada, contados desde
 * `nowIso`. Depende solo del horario, no de la última importación: una
 * sincronización a mano no adelanta ni retrasa el cron.
 */
export function minutesUntilNextSync(nowIso: string): number {
  const now = new Date(nowIso);

  const upcoming = [0, 1].flatMap((dayOffset) =>
    SYNC_SCHEDULE_UTC_HOURS.map((hour) => {
      const slot = new Date(now);
      slot.setUTCDate(slot.getUTCDate() + dayOffset);
      slot.setUTCHours(hour, 0, 0, 0);
      return slot.getTime();
    }),
  );

  const next = Math.min(...upcoming.filter((time) => time > now.getTime()));

  return Math.ceil((next - now.getTime()) / MINUTE);
}
