import { CONNECTIONS_SUMMARY_COPY } from "@/constants/connections.constants";
import type { PlatformConnection } from "@/domain/entities/platform-connection";
import type { StatStripItem } from "@/types/ui.types";
import { formatNextSync } from "@/utils/format-next-sync";
import { formatRelativeTime } from "@/utils/format-relative-time";

/**
 * Cifras de cabecera de `B10`: cuántas cuentas alimentan adsme, cuánto han
 * traído y cuándo vuelven a hacerlo.
 */
export function buildConnectionsSummary(
  connections: PlatformConnection[],
  importedCount: number,
  lastSyncedAt: string | null,
  nowIso: string,
): StatStripItem[] {
  const connected = connections.filter(
    (connection) => connection.status === "connected",
  ).length;

  return [
    {
      value: `${connected} de ${connections.length}`,
      label: CONNECTIONS_SUMMARY_COPY.connectedAccounts,
    },
    {
      value: String(importedCount),
      label: CONNECTIONS_SUMMARY_COPY.importedCampaigns,
    },
    {
      value: lastSyncedAt
        ? formatRelativeTime(lastSyncedAt, nowIso)
        : CONNECTIONS_SUMMARY_COPY.never,
      label: CONNECTIONS_SUMMARY_COPY.lastSync,
    },
    {
      value: formatNextSync(lastSyncedAt, nowIso) ?? "—",
      label: CONNECTIONS_SUMMARY_COPY.nextSync,
    },
  ];
}
