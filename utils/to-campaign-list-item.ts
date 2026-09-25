import { PLATFORM_OF_CONNECTION } from "@/constants/platform-labels.constants";
import type { Campaign } from "@/domain/entities/campaign";
import type { CampaignListItem } from "@/types/campaigns-list.types";
import { formatJobPeriod } from "@/utils/format-job-period";
import { resolveCampaignState } from "@/utils/resolve-campaign-state";

/** Guion que ocupa el sitio de un dato que la plataforma no devolvió. */
const MISSING = "—";

/** Pasa una campaña importada a lo que necesita una fila de `B9`. */
export function toCampaignListItem(
  campaign: Campaign,
  accountLabel: string,
  today: string,
): CampaignListItem {
  return {
    id: campaign.id,
    name: campaign.name,
    reference: campaign.objective
      ? `ID ${campaign.externalCampaignId} · ${campaign.objective}`
      : `ID ${campaign.externalCampaignId}`,
    platform: PLATFORM_OF_CONNECTION[campaign.platform],
    accountLabel: accountLabel || MISSING,
    state: resolveCampaignState(campaign.status, campaign.endsAt, today),
    period:
      campaign.startsAt && campaign.endsAt
        ? formatJobPeriod(
            campaign.startsAt.slice(0, 10),
            campaign.endsAt.slice(0, 10),
          )
        : MISSING,
    reach: campaign.reach,
    spend: campaign.spend,
  };
}
