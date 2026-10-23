import type { Campaign } from "@/domain/entities/campaign";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";

/** Caso de uso: las campañas vinculadas a un trabajo, de cualquier plataforma. */
export function createListJobCampaigns(repository: CampaignRepository) {
  return async function listJobCampaigns(jobId: string): Promise<Campaign[]> {
    return repository.listJobCampaigns(jobId);
  };
}
