import type { Campaign, CampaignListQuery } from "@/domain/entities/campaign";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";

/** Caso de uso: listar las campañas importadas según los filtros. */
export function createListCampaigns(repository: CampaignRepository) {
  return async function listCampaigns(
    query: CampaignListQuery = DEFAULT_CAMPAIGN_LIST_QUERY,
  ): Promise<Campaign[]> {
    return repository.listCampaigns({ ...query, search: query.search.trim() });
  };
}
