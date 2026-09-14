import type { JobListing } from "@/domain/entities/job-listing";
import type {
  JobListQuery,
  JobSort,
  JobSortColumn,
} from "@/domain/entities/job-query";
import type { FilterSelectOption } from "@/types/ui.types";

/** Eje temporal común a todas las filas visibles de la tabla. */
export interface JobTimeline {
  from: string;
  to: string;
  totalDays: number;
  /** Posición de hoy sobre el eje, en porcentaje. */
  todayPercent: number;
  /** Rango en meses abreviados para la cabecera («jul–sep»). */
  label: string;
}

export interface JobTimelineSpan {
  leftPercent: number;
  widthPercent: number;
}

export type CountdownTone = "muted" | "warning" | "danger";

export interface JobCountdown {
  label: string;
  tone: CountdownTone;
}

/** Estado del tramo en la línea de tiempo, que decide su color. */
export type JobSpanTone =
  | "running"
  | "syncing"
  | "upcoming"
  | "overdue"
  | "muted";

export interface JobsTableProps {
  jobs: JobListing[];
  totalJobs: number;
  /** Fecha de render en ISO, para situar hoy sin desfases de hidratación. */
  today: string;
  sort: JobSort;
}

export interface JobRowProps {
  job: JobListing;
  timeline: JobTimeline;
  today: string;
}

/** La celda de período necesita exactamente lo mismo que la fila que la contiene. */
export type JobTimelineCellProps = JobRowProps;

export interface JobRowMenuProps {
  job: JobListing;
}

export interface SortHeaderProps {
  label: string;
  column: JobSortColumn;
  sort: JobSort;
}

export interface JobsToolbarProps {
  query: JobListQuery;
  /** Clientes con trabajos, para poblar el filtro «Cliente». */
  clientOptions: FilterSelectOption<string>[];
}

export interface JobsEmptyProps {
  /** Con filtros activos el mensaje invita a limpiarlos en vez de a crear. */
  isFiltered: boolean;
}
