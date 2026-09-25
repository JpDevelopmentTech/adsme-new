import {
  ALL_ACCOUNTS_OPTION,
  CAMPAIGN_LINK_OPTIONS,
  CAMPAIGN_QUERY_PARAMS,
} from "@/constants/campaigns.constants";
import {
  DEFAULT_CAMPAIGN_LIST_QUERY,
  type CampaignListQuery,
} from "@/domain/entities/campaign";
import type { RawSearchParams } from "@/utils/parse-client-list-query";

/** Construye la consulta del listado de campañas a partir de la URL. */
export function parseCampaignListQuery(
  params: RawSearchParams,
): CampaignListQuery {
  const link = CAMPAIGN_LINK_OPTIONS.find(
    (option) => option.value === params[CAMPAIGN_QUERY_PARAMS.link],
  );
  const connection = params[CAMPAIGN_QUERY_PARAMS.connection];
  const search = params[CAMPAIGN_QUERY_PARAMS.search];

  return {
    search: typeof search === "string" ? search.trim() : "",
    connectionId:
      typeof connection === "string" && connection !== ALL_ACCOUNTS_OPTION.value
        ? connection
        : DEFAULT_CAMPAIGN_LIST_QUERY.connectionId,
    link: link ? link.value : DEFAULT_CAMPAIGN_LIST_QUERY.link,
  };
}

/** Hay algún filtro puesto, así que el vacío se explica de otra manera. */
export function isFilteredCampaignQuery(query: CampaignListQuery): boolean {
  return (
    query.search !== "" ||
    query.connectionId !== DEFAULT_CAMPAIGN_LIST_QUERY.connectionId ||
    query.link !== DEFAULT_CAMPAIGN_LIST_QUERY.link
  );
}
