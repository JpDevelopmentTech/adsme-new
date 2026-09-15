import {
  CONNECTIONS_SUMMARY_COPY,
  SYNC_INTERVAL_MINUTES,
} from "@/constants/connections.constants";
import type { PlatformConnection } from "@/domain/entities/platform-connection";
import type { ConnectionsStatus } from "@/types/connections.types";
import { formatRelativeTime } from "@/utils/format-relative-time";

const MINUTE = 60_000;

/**
 * Estado de la importación para la banda de `B10`. La pregunta que trae al
 * usuario a esta pantalla es «¿está entrando la información?», así que el
 * titular la responde en una frase en vez de dejar cuatro cifras sueltas.
 */
export function buildConnectionsStatus(
  connections: PlatformConnection[],
  importedCount: number,
  lastSyncedAt: string | null,
  nowIso: string,
): ConnectionsStatus {
  const connected = connections.filter(
    (connection) => connection.status === "connected",
  );
  const accounts = connected.reduce(
    (total, connection) => total + connection.accountNames.length,
    0,
  );
  const needsAttention = connected.some(
    (connection) => connection.access?.isExpiring ?? false,
  );

  const dueAt = lastSyncedAt
    ? Date.parse(lastSyncedAt) + SYNC_INTERVAL_MINUTES * MINUTE
    : null;
  const minutesLeft =
    dueAt === null
      ? null
      : Math.max(0, Math.ceil((dueAt - Date.parse(nowIso)) / MINUTE));

  const headline =
    accounts === 0
      ? CONNECTIONS_SUMMARY_COPY.stopped
      : needsAttention
        ? CONNECTIONS_SUMMARY_COPY.attention
        : CONNECTIONS_SUMMARY_COPY.flowing;

  const detail =
    accounts === 0
      ? CONNECTIONS_SUMMARY_COPY.noAccounts
      : [
          CONNECTIONS_SUMMARY_COPY.accounts(accounts, connected.length),
          CONNECTIONS_SUMMARY_COPY.campaigns(importedCount),
          lastSyncedAt
            ? CONNECTIONS_SUMMARY_COPY.lastSync(
                formatRelativeTime(lastSyncedAt, nowIso),
              )
            : CONNECTIONS_SUMMARY_COPY.never,
        ].join(" · ");

  return {
    minutesLeft,
    // Lo que se dibuja es el ciclo ya consumido, no lo que falta: el anillo
    // se llena a medida que se acerca la siguiente importación.
    elapsedPercent:
      minutesLeft === null
        ? 0
        : Math.min(
            100,
            ((SYNC_INTERVAL_MINUTES - minutesLeft) / SYNC_INTERVAL_MINUTES) * 100,
          ),
    headline,
    detail,
  };
}
