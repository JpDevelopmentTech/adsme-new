import { PLATFORM_LABELS } from "@/constants/platform-labels.constants";
import type { Campaign } from "@/domain/entities/campaign";
import type { Connection } from "@/domain/entities/connection";
import type { JobPlatform } from "@/domain/entities/job";
import type { PlatformConnection } from "@/domain/entities/platform-connection";
import { buildConnectionAccess } from "@/utils/build-connection-access";
import { formatRelativeTime } from "@/utils/format-relative-time";
import { isActiveCampaignStatus } from "@/utils/is-active-campaign";

/**
 * Estado de la tarjeta de una plataforma a partir de su conexión guardada.
 *
 * Recibe y devuelve `JobPlatform` —no `ConnectionPlatform`— porque la tarjeta
 * indexa por ahí sus iconos y colores de marca: para la pantalla, la cuenta de
 * Google Ads es «YouTube».
 */
export function toPlatformConnection(
  platform: JobPlatform,
  connection: Connection | null,
  campaigns: Campaign[],
  now: Date,
): PlatformConnection {
  const name = PLATFORM_LABELS[platform];

  if (!connection) {
    return {
      platform,
      name,
      status: "disconnected",
      accountName: null,
      activeCampaigns: null,
      importedSpend: null,
      lastSyncedLabel: null,
      access: null,
    };
  }

  const own = campaigns.filter(
    (campaign) => campaign.connectionId === connection.id,
  );

  return {
    platform,
    name,
    status: "connected",
    accountName: connection.accountLabel,
    activeCampaigns: own.filter((campaign) =>
      isActiveCampaignStatus(campaign.status),
    ).length,
    importedSpend: own.reduce((total, campaign) => total + campaign.spend, 0),
    lastSyncedLabel: connection.lastSyncedAt
      ? formatRelativeTime(connection.lastSyncedAt, now.toISOString())
      : "sin sincronizar",
    access: buildConnectionAccess(connection, now),
  };
}
