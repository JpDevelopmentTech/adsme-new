import {
  CLIENT_KIND_OPTIONS,
  CLIENT_QUERY_PARAMS,
  CLIENT_SORT_OPTIONS,
  CLIENT_STATUS_OPTIONS,
  type FilterOption,
} from "@/constants/client-filters.constants";
import {
  DEFAULT_CLIENT_LIST_QUERY,
  type ClientKindFilter,
  type ClientListQuery,
  type ClientSort,
  type ClientStatusFilter,
} from "@/domain/entities/client-query";

/** Valores de `searchParams` tal como los entrega Next.js. */
export type RawSearchParams = Record<string, string | string[] | undefined>;

/**
 * Construye la consulta del listado a partir de la URL, descartando cualquier
 * valor que no esté entre las opciones válidas.
 */
export function parseClientListQuery(params: RawSearchParams): ClientListQuery {
  return {
    search: readText(params[CLIENT_QUERY_PARAMS.search]),
    status: readOption<ClientStatusFilter>(
      params[CLIENT_QUERY_PARAMS.status],
      CLIENT_STATUS_OPTIONS,
      DEFAULT_CLIENT_LIST_QUERY.status,
    ),
    kind: readOption<ClientKindFilter>(
      params[CLIENT_QUERY_PARAMS.kind],
      CLIENT_KIND_OPTIONS,
      DEFAULT_CLIENT_LIST_QUERY.kind,
    ),
    sort: readOption<ClientSort>(
      params[CLIENT_QUERY_PARAMS.sort],
      CLIENT_SORT_OPTIONS,
      DEFAULT_CLIENT_LIST_QUERY.sort,
    ),
  };
}

function readText(value: string | string[] | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function readOption<TValue extends string>(
  value: string | string[] | undefined,
  options: FilterOption<TValue>[],
  fallback: TValue,
): TValue {
  const match = options.find((option) => option.value === value);

  return match ? match.value : fallback;
}
