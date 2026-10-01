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
  | "muted"
  | "ending";

/** Rótulo de mes sobre el eje común, situado por su porcentaje. */
export interface TimelineMonth {
  label: string;
  percent: number;
}

/** Cifras de la banda de `B5`; los grupos son excluyentes y suman `total`. */
export interface JobsSummary {
  invested: number;
  total: number;
  running: number;
  /** Trabajos en curso a los que les quedan siete días o menos. */
  endingSoon: number;
  /** Activos cuyo período ya terminó: ni corriendo ni cerrados. */
  overdue: number;
  upcoming: number;
  finished: number;
}

export interface JobsSummaryBandProps {
  summary: JobsSummary;
}

export interface JobsTableProps {
  jobs: JobListing[];
  totalJobs: number;
  /** Fecha de render en ISO, para situar hoy sin desfases de hidratación. */
  today: string;
  query: JobListQuery;
  /** Clientes con trabajos, para poblar el filtro «Cliente». */
  clientOptions: FilterSelectOption<string>[];
  isFiltered: boolean;
}

export interface JobReportLinkProps {
  reportUrl: string | null;
  jobTitle: string;
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
  /** Deja solo la flecha; el rótulo pasa a ser accesible pero invisible. */
  hideLabel?: boolean;
}

export interface JobsToolbarProps {
  query: JobListQuery;
  /** Clientes con trabajos, para poblar el filtro «Cliente». */
  clientOptions: FilterSelectOption<string>[];
  /** Recuento que se muestra a la derecha de los filtros. */
  resultsLabel: string;
}

export interface JobsEmptyProps {
  /** Con filtros activos el mensaje invita a limpiarlos en vez de a crear. */
  isFiltered: boolean;
}

export interface JobsTimelineHeaderProps {
  months: TimelineMonth[];
  todayPercent: number;
  sort: JobSort;
}
