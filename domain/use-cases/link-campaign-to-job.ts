import type { Campaign } from "@/domain/entities/campaign";
import type { ClientResult } from "@/domain/entities/client-error";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";

/**
 * Caso de uso: vincular una campaña de la plataforma con un trabajo de adsme,
 * que es como la campaña acaba asociada a un cliente. Con `null` se desvincula.
 */
export function createLinkCampaignToJob(repository: CampaignRepository) {
  return async function linkCampaignToJob(
    campaignId: string,
    jobId: string | null,
  ): Promise<ClientResult<Campaign>> {
    return repository.linkCampaignToJob(campaignId, jobId);
  };
}
