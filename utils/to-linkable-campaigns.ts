import type { Campaign } from "@/domain/entities/campaign";
import type { Connection } from "@/domain/entities/connection";
import type { LinkableCampaign } from "@/types/link-campaign.types";

/** Añade a cada campaña el nombre de la cuenta de la que proviene. */
export function toLinkableCampaigns(
  campaigns: Campaign[],
  connections: Connection[],
): LinkableCampaign[] {
  const labels = new Map(
    connections.map((connection) => [connection.id, connection.accountLabel]),
  );

  return campaigns.map((campaign) => ({
    ...campaign,
    accountLabel: labels.get(campaign.connectionId) ?? "",
  }));
}
