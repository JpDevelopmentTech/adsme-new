import { CONNECTIONS_SUMMARY_COPY } from "@/constants/connections.constants";
import { PLATFORM_LABELS } from "@/constants/platform-labels.constants";
import type { Campaign } from "@/domain/entities/campaign";
import type { Connection } from "@/domain/entities/connection";
import type { JobPlatform } from "@/domain/entities/job";
import type { PlatformConnection } from "@/domain/entities/platform-connection";
import { buildConnectionAccess } from "@/utils/build-connection-access";
import { formatRelativeTime } from "@/utils/format-relative-time";
import { isActiveCampaignStatus } from "@/utils/is-active-campaign";
import { worstConnection } from "@/utils/worst-connection";

/**
 * Cuándo se importó por última vez. Con varias cuentas manda la que lleva más
 * tiempo sin sincronizar: es la que tiene los datos viejos, y quedarse con la
 * más reciente diría que todo está al día teniendo una cuenta parada.
 */
function lastSyncedLabelOf(connections: Connection[], now: Date): string {
  const synced = connections
    .map((connection) => connection.lastSyncedAt)
    .filter((value): value is string => value !== null)
    .sort();

  // Basta con que una cuenta no haya sincronizado nunca para que la plataforma
  // no esté al día.
  if (synced.length < connections.length) return CONNECTIONS_SUMMARY_COPY.never;

  return formatRelativeTime(synced[0], now.toISOString());
}

/**
 * Estado de la tarjeta de una plataforma a partir de sus conexiones guardadas.
 * Las métricas se suman entre cuentas porque la tarjeta habla de la plataforma
 * entera; la vigencia, en cambio, es la de la cuenta que peor está.
 *
 * Recibe y devuelve `JobPlatform` —no `ConnectionPlatform`— porque la tarjeta
 * indexa por ahí sus iconos y colores de marca: para la pantalla, la cuenta de
 * Google Ads es «YouTube».
 */
export function toPlatformConnection(
  platform: JobPlatform,
  connections: Connection[],
  campaigns: Campaign[],
  now: Date,
): PlatformConnection {
  const name = PLATFORM_LABELS[platform];
  const weakest = worstConnection(connections);

  if (!weakest) {
    return {
      platform,
      name,
      status: "disconnected",
      accountNames: [],
      activeCampaigns: null,
      importedSpend: null,
      lastSyncedLabel: null,
      access: null,
    };
  }

  const ids = new Set(connections.map((connection) => connection.id));
  const own = campaigns.filter((campaign) => ids.has(campaign.connectionId));

  return {
    platform,
    name,
    status: "connected",
    accountNames: connections.map((connection) => connection.accountLabel),
    activeCampaigns: own.filter((campaign) =>
      isActiveCampaignStatus(campaign.status),
    ).length,
    importedSpend: own.reduce((total, campaign) => total + campaign.spend, 0),
    lastSyncedLabel: lastSyncedLabelOf(connections, now),
    access: buildConnectionAccess(weakest, now),
  };
}
