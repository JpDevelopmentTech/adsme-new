import type { Campaign } from "@/domain/entities/campaign";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";

/** Caso de uso: obtener una campaña por su identificador. */
export function createGetCampaign(repository: CampaignRepository) {
  return async function getCampaign(campaignId: string): Promise<Campaign | null> {
    return repository.getCampaign(campaignId);
  };
}
