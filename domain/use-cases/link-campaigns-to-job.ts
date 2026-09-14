import type { ClientResult } from "@/domain/entities/client-error";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";

/** Caso de uso: vincular varias campañas al mismo trabajo de una vez. */
export function createLinkCampaignsToJob(repository: CampaignRepository) {
  return async function linkCampaignsToJob(
    campaignIds: string[],
    jobId: string,
  ): Promise<ClientResult<number>> {
    return repository.linkCampaignsToJob(campaignIds, jobId);
  };
}
