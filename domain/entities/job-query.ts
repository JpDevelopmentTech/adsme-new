import type { JobPlatform, JobStatus } from "@/domain/entities/job";

export type JobStatusFilter = "all" | JobStatus;

export type JobPlatformFilter = "all" | JobPlatform;

/** Handle del cliente, o `all` para no filtrar por cliente. */
export type JobClientFilter = string;

/** Columnas por las que se puede ordenar desde la cabecera de la tabla. */
export type JobSortColumn = "investment" | "period";

export type JobSort =
  | "recent"
  | "investment-desc"
  | "investment-asc"
  | "period-desc"
  | "period-asc";

export interface JobListQuery {
  /** Texto libre que se compara contra el título del trabajo y el artista. */
  search: string;
  status: JobStatusFilter;
  platform: JobPlatformFilter;
  client: JobClientFilter;
  sort: JobSort;
}

export const DEFAULT_JOB_LIST_QUERY: JobListQuery = {
  search: "",
  status: "all",
  platform: "all",
  client: "all",
  sort: "recent",
};

/**
 * Indica si la consulta reduce el listado respecto a mostrarlo entero. El orden
 * queda fuera: cambia la secuencia, no cuántos trabajos se ven.
 */
export function isFilteredJobQuery(query: JobListQuery): boolean {
  return (
    query.search.trim().length > 0 ||
    query.status !== "all" ||
    query.platform !== "all" ||
    query.client !== "all"
  );
}

/** Sentido activo de una columna, o `null` cuando no es la que ordena. */
export function jobSortDirection(
  column: JobSortColumn,
  sort: JobSort,
): "asc" | "desc" | null {
  if (sort === `${column}-desc`) return "desc";

  return sort === `${column}-asc` ? "asc" : null;
}

/** Ciclo de la cabecera: descendente, ascendente y vuelta al orden por defecto. */
export function nextJobSort(column: JobSortColumn, sort: JobSort): JobSort {
  const direction = jobSortDirection(column, sort);

  if (direction === "desc") return `${column}-asc`;
  if (direction === "asc") return DEFAULT_JOB_LIST_QUERY.sort;

  return `${column}-desc`;
}
