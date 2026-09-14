import type {
  JobPlatformFilter,
  JobSort,
  JobStatusFilter,
} from "@/domain/entities/job-query";
import type { FilterOption } from "@/constants/client-filters.constants";
import type { CountdownTone, JobSpanTone } from "@/types/jobs-list.types";

export const JOB_QUERY_PARAMS = {
  search: "q",
  status: "estado",
  platform: "plataforma",
  client: "cliente",
  sort: "orden",
} as const;

export const JOBS_COPY = {
  title: "Trabajos",
  newJob: "Nuevo trabajo",
  searchPlaceholder: "Buscar canción o artista…",
  listView: "Ver como lista",
  gridView: "Ver como tarjetas",
  gridPending: "La vista de tarjetas todavía no está diseñada",
  openJob: "Ver trabajo",
  noLink: "Sin enlace",
  perDay: "/día",
  sortBy: (column: string) => `Ordenar por ${column}`,
} as const;

export const JOB_FILTER_PREFIXES = {
  status: "Estado",
  platform: "Plataforma",
  client: "Cliente",
} as const;

export const JOB_STATUS_OPTIONS: FilterOption<JobStatusFilter>[] = [
  { value: "all", label: "Todas" },
  { value: "active", label: "Activa" },
  { value: "syncing", label: "Sincronizando" },
  { value: "finished", label: "Finalizada" },
];

export const JOB_PLATFORM_OPTIONS: FilterOption<JobPlatformFilter>[] = [
  { value: "all", label: "Todas" },
  { value: "youtube", label: "YouTube" },
  { value: "meta", label: "Meta" },
  { value: "tiktok", label: "TikTok" },
];

export const JOB_SORT_VALUES: JobSort[] = [
  "recent",
  "investment-desc",
  "investment-asc",
  "period-desc",
  "period-asc",
];

/** Color del tramo de cada trabajo en la línea de tiempo de la columna PERÍODO. */
export const JOB_SPAN_TONES: Record<JobSpanTone, string> = {
  running: "bg-brand-violet",
  syncing: "bg-data-cyan",
  upcoming: "bg-brand-violet/45",
  overdue: "bg-danger",
  muted: "bg-text-muted",
};

export const JOB_COUNTDOWN_TONES: Record<CountdownTone, string> = {
  muted: "text-text-muted",
  warning: "text-warning",
  danger: "text-danger",
};

/** Encabezados de la tabla, en el orden del diseño. */
export const JOB_TABLE_COLUMNS = {
  job: "TRABAJO",
  platforms: "PLATAFORMAS",
  period: "PERÍODO",
  investment: "INVERSIÓN",
  status: "ESTADO",
  report: "REPORTE",
} as const;

export const JOBS_EMPTY_COPY = {
  title: "Aún no tienes trabajos",
  subtitle:
    "Crea un trabajo para empezar a pautar el lanzamiento de alguno de tus clientes.",
  noResultsTitle: "Ningún trabajo coincide",
  noResultsSubtitle:
    "Prueba con otro término de búsqueda o quita algún filtro para ver más resultados.",
  clearFilters: "Limpiar filtros",
} as const;
