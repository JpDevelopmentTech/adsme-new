import type { ClientResult } from "@/domain/entities/client-error";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";

/** Caso de uso: eliminar una campaña del usuario autenticado. */
export function createDeleteCampaign(repository: CampaignRepository) {
  return async function deleteCampaign(
    campaignId: string,
  ): Promise<ClientResult<null>> {
    return repository.deleteCampaign(campaignId);
  };
}
