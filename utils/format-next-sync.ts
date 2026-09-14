import { SYNC_INTERVAL_MINUTES } from "@/constants/connections.constants";

const MINUTE = 60_000;

/**
 * Cuándo toca la siguiente importación, contando desde la última. Devuelve
 * «ahora» cuando ya venció el intervalo y `null` si nunca se ha sincronizado,
 * porque entonces no hay ciclo del que partir.
 */
export function formatNextSync(
  lastSyncedAt: string | null,
  nowIso: string,
): string | null {
  if (!lastSyncedAt) return null;

  const dueAt = Date.parse(lastSyncedAt) + SYNC_INTERVAL_MINUTES * MINUTE;
  const minutesLeft = Math.ceil((dueAt - Date.parse(nowIso)) / MINUTE);

  return minutesLeft <= 0 ? "ahora" : `en ${minutesLeft} min`;
}
