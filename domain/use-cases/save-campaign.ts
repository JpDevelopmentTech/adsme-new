import type { Campaign, CampaignDraft } from "@/domain/entities/campaign";
import type { ClientResult } from "@/domain/entities/client-error";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";

/**
 * Caso de uso: crear o actualizar una campaña. Un identificador ausente
 * significa alta; presente, edición.
 */
export function createSaveCampaign(repository: CampaignRepository) {
  return async function saveCampaign(
    campaignId: string | null,
    draft: CampaignDraft,
  ): Promise<ClientResult<Campaign>> {
    const normalized = { ...draft, name: draft.name.trim() };

    return campaignId
      ? repository.updateCampaign(campaignId, normalized)
      : repository.createCampaign(normalized);
  };
}
