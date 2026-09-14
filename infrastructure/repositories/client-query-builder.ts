import type { ClientListQuery, ClientSort } from "@/domain/entities/client-query";

/** Traducción de cada orden de la UI a la columna y sentido de PostgREST. */
const SORT_COLUMNS: Record<ClientSort, { column: string; ascending: boolean }> = {
  recent: { column: "created_at", ascending: false },
  oldest: { column: "created_at", ascending: true },
  "name-asc": { column: "name", ascending: true },
  "name-desc": { column: "name", ascending: false },
};

export function resolveSort(sort: ClientSort) {
  return SORT_COLUMNS[sort];
}

/**
 * Escapa el texto de búsqueda para usarlo dentro de un filtro `or(...)`:
 * las comas y los paréntesis rompen la sintaxis de PostgREST, y `%` y `_`
 * son comodines de `LIKE` que el usuario no debería poder inyectar.
 */
export function toSearchPattern(search: string): string {
  const escaped = search.replace(/[%_\\]/g, "\\$&").replace(/[(),]/g, " ");

  return `%${escaped}%`;
}

/** Filtro `or` de PostgREST que busca el texto en el nombre o en el @usuario. */
export function buildSearchFilter(query: ClientListQuery): string {
  const pattern = toSearchPattern(query.search);

  return `name.ilike.${pattern},handle.ilike.${pattern}`;
}
