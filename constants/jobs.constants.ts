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
  count: (total: number) => (total === 1 ? "1 trabajo" : `${total} trabajos`),
  results: (shown: number, total: number) => `${shown} de ${total}`,
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

/** Textos de la banda que encabeza el listado. */
export const JOBS_BAND_COPY = {
  eyebrow: "En pauta ahora mismo",
  committed: (total: number) =>
    total === 1
      ? "comprometidos en 1 trabajo"
      : `comprometidos en ${total} trabajos`,
  running: (count: number) => `${count} en curso`,
  endingSoon: (count: number) =>
    count === 1 ? "1 acaba esta semana" : `${count} acaban esta semana`,
  overdue: (count: number) =>
    count === 1 ? "1 vencido sin cerrar" : `${count} vencidos sin cerrar`,
  upcoming: (count: number) => `${count} sin empezar`,
  finished: (count: number) =>
    count === 1 ? "1 finalizado" : `${count} finalizados`,
} as const;

/**
 * Anchos de las columnas de la tabla, en porcentaje del ancho del panel. En
 * porcentaje y no en píxeles para que la columna del eje conserve su proporción
 * a cualquier ancho: si se estrechara sola, los tramos dejarían de ser legibles.
 */
export const JOB_TABLE_WIDTHS = [
  "27.26%",
  "9.55%",
  "34.2%",
  "11.11%",
  "9.55%",
  "3.65%",
  "4.69%",
] as const;

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
  running: "bg-ink",
  syncing: "bg-meta",
  upcoming: "bg-g-400",
  overdue: "bg-accent",
  muted: "bg-g-500",
};

export const JOB_COUNTDOWN_TONES: Record<CountdownTone, string> = {
  muted: "text-text-muted",
  warning: "text-warning",
  danger: "text-accent",
};

/** Encabezados de la tabla, en el orden del diseño. */
export const JOB_TABLE_COLUMNS = {
  job: "TRABAJO",
  platforms: "PAUTA",
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
