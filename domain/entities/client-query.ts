import type { ClientKind } from "@/domain/entities/client";

/**
 * Estados por los que se puede filtrar. `empty` queda fuera a propósito: un
 * cliente sin trabajos se reconoce por su tarjeta, no es un criterio de trabajo.
 */
export type ClientStatusFilter = "all" | "active" | "paused";

export type ClientKindFilter = "all" | ClientKind;

export type ClientSort = "recent" | "oldest" | "name-asc" | "name-desc";

/** Criterios de búsqueda, filtrado y orden del listado de clientes. */
export interface ClientListQuery {
  /** Texto libre que se compara contra el nombre y el @usuario. */
  search: string;
  status: ClientStatusFilter;
  kind: ClientKindFilter;
  sort: ClientSort;
}

export const DEFAULT_CLIENT_LIST_QUERY: ClientListQuery = {
  search: "",
  status: "all",
  kind: "all",
  sort: "recent",
};

/** Indica si la consulta reduce el listado respecto a mostrarlo entero. */
export function isFilteredQuery(query: ClientListQuery): boolean {
  return (
    query.search.trim().length > 0 || query.status !== "all" || query.kind !== "all"
  );
}
