"use client";

import {
  ALL_ACCOUNTS_OPTION,
  CAMPAIGNS_COPY,
  CAMPAIGN_FILTER_PREFIXES,
  CAMPAIGN_LINK_OPTIONS,
  CAMPAIGN_QUERY_PARAMS,
} from "@/constants/campaigns.constants";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { FilterSelect } from "@/presentation/components/ui/filter-select";
import { SearchField } from "@/presentation/components/ui/search-field";
import { SegmentedControl } from "@/presentation/components/ui/segmented-control";
import { useQueryParams } from "@/presentation/hooks/use-query-params";
import type { CampaignsToolbarProps } from "@/types/campaigns-list.types";

/**
 * Búsqueda y filtros del listado. Vive dentro del panel porque filtra esa
 * tabla, y el estado vive en la URL, igual que en `B2` y `B5`. El vínculo va en
 * un control segmentado y no en un desplegable: son tres opciones fijas y es la
 * pregunta que más se cambia en esta pantalla.
 */
export function CampaignsToolbar({
  query,
  accountOptions,
  resultsLabel,
}: CampaignsToolbarProps) {
  const { setParam } = useQueryParams();

  return (
    <div className="flex flex-wrap items-center gap-2.5 px-5 py-3">
      <SearchField
        value={query.search}
        paramName={CAMPAIGN_QUERY_PARAMS.search}
        placeholder={CAMPAIGNS_COPY.searchPlaceholder}
      />

      <FilterSelect
        prefix={CAMPAIGN_FILTER_PREFIXES.connection}
        value={query.connectionId}
        options={accountOptions}
        defaultValue={ALL_ACCOUNTS_OPTION.value}
        onChange={(value) =>
          setParam(
            CAMPAIGN_QUERY_PARAMS.connection,
            value === ALL_ACCOUNTS_OPTION.value ? null : value,
          )
        }
        onClear={() => setParam(CAMPAIGN_QUERY_PARAMS.connection, null)}
      />

      <SegmentedControl
        label="Filtrar por vínculo"
        value={query.link}
        options={CAMPAIGN_LINK_OPTIONS}
        onChange={(value) =>
          setParam(
            CAMPAIGN_QUERY_PARAMS.link,
            value === DEFAULT_CAMPAIGN_LIST_QUERY.link ? null : value,
          )
        }
      />

      <div className="flex-1" />

      <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
        {resultsLabel}
      </span>
    </div>
  );
}
