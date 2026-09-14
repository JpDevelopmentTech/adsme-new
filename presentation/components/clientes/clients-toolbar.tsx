"use client";

import { ArrowUpDown } from "lucide-react";
import {
  CLIENT_FILTER_PREFIXES,
  CLIENT_KIND_OPTIONS,
  CLIENT_QUERY_PARAMS,
  CLIENT_SORT_OPTIONS,
  CLIENT_STATUS_OPTIONS,
} from "@/constants/client-filters.constants";
import { CLIENTS_COPY } from "@/constants/clients.constants";
import { DEFAULT_CLIENT_LIST_QUERY } from "@/domain/entities/client-query";
import { FilterSelect } from "@/presentation/components/ui/filter-select";
import { SearchField } from "@/presentation/components/ui/search-field";
import { SegmentedControl } from "@/presentation/components/ui/segmented-control";
import { useQueryParams } from "@/presentation/hooks/use-query-params";
import type { ClientsToolbarProps } from "@/types/client.types";

/** Barra de búsqueda, filtros y orden; todo el estado vive en la URL. */
export function ClientsToolbar({ query }: ClientsToolbarProps) {
  const { setParam } = useQueryParams();

  /** Escribe el parámetro salvo que sea el valor por defecto, que se omite. */
  const applyFilter = (key: string, value: string, fallback: string) => {
    setParam(key, value === fallback ? null : value);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchField
        value={query.search}
        paramName={CLIENT_QUERY_PARAMS.search}
        placeholder={CLIENTS_COPY.searchPlaceholder}
      />

      <SegmentedControl
        label={CLIENTS_COPY.filterStatus}
        value={query.status}
        options={CLIENT_STATUS_OPTIONS}
        onChange={(value) =>
          applyFilter(
            CLIENT_QUERY_PARAMS.status,
            value,
            DEFAULT_CLIENT_LIST_QUERY.status,
          )
        }
      />

      <FilterSelect
        prefix={CLIENT_FILTER_PREFIXES.kind}
        value={query.kind}
        options={CLIENT_KIND_OPTIONS}
        defaultValue={DEFAULT_CLIENT_LIST_QUERY.kind}
        onChange={(value) =>
          applyFilter(
            CLIENT_QUERY_PARAMS.kind,
            value,
            DEFAULT_CLIENT_LIST_QUERY.kind,
          )
        }
      />

      <div className="flex-1" />

      <FilterSelect
        align="end"
        value={query.sort}
        options={CLIENT_SORT_OPTIONS}
        defaultValue={DEFAULT_CLIENT_LIST_QUERY.sort}
        icon={<ArrowUpDown size={15} className="text-text-muted" aria-hidden />}
        onChange={(value) =>
          applyFilter(
            CLIENT_QUERY_PARAMS.sort,
            value,
            DEFAULT_CLIENT_LIST_QUERY.sort,
          )
        }
      />
    </div>
  );
}
