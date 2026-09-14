import type {
  ClientKindFilter,
  ClientSort,
  ClientStatusFilter,
} from "@/domain/entities/client-query";

/** Nombres de los parámetros de búsqueda en la URL del listado. */
export const CLIENT_QUERY_PARAMS = {
  search: "q",
  status: "estado",
  kind: "tipo",
  sort: "orden",
} as const;

export interface FilterOption<TValue extends string> {
  value: TValue;
  label: string;
}

export const CLIENT_STATUS_OPTIONS: FilterOption<ClientStatusFilter>[] = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "paused", label: "Pausados" },
];

export const CLIENT_KIND_OPTIONS: FilterOption<ClientKindFilter>[] = [
  { value: "all", label: "Todos" },
  { value: "Artista", label: "Artista" },
  { value: "Banda", label: "Banda" },
  { value: "Manager", label: "Manager" },
];

export const CLIENT_SORT_OPTIONS: FilterOption<ClientSort>[] = [
  { value: "recent", label: "Recientes" },
  { value: "oldest", label: "Más antiguos" },
  { value: "name-asc", label: "Nombre (A–Z)" },
  { value: "name-desc", label: "Nombre (Z–A)" },
];

export const CLIENT_FILTER_PREFIXES = {
  status: "Estado",
  kind: "Tipo",
} as const;

export const CLIENTS_NO_RESULTS_COPY = {
  title: "Ningún cliente coincide",
  subtitle:
    "Prueba con otro término de búsqueda o quita algún filtro para ver más resultados.",
  action: "Limpiar filtros",
} as const;
