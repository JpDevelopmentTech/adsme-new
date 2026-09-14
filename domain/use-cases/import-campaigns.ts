import type { CampaignDraft } from "@/domain/entities/campaign";
import type { ClientResult } from "@/domain/entities/client-error";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";

/**
 * Caso de uso: volcar en adsme lo que devuelve la plataforma. Conserva la
 * vinculación con el trabajo que cada campaña ya tuviera.
 */
export function createImportCampaigns(repository: CampaignRepository) {
  return async function importCampaigns(
    connectionId: string,
    drafts: CampaignDraft[],
  ): Promise<ClientResult<number>> {
    return repository.upsertCampaigns(connectionId, drafts);
  };
}
