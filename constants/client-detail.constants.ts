import type { JobStatus } from "@/domain/entities/job";
import type { StatusTone } from "@/types/ui.types";

/** Etiqueta y tono del badge de estado de cada trabajo, según el diseño de `B3`. */
export const JOB_STATUS_BADGE: Record<
  JobStatus,
  { label: string; tone: StatusTone }
> = {
  active: { label: "Activa", tone: "success" },
  finished: { label: "Finalizada", tone: "brand" },
  syncing: { label: "Sincronizando", tone: "info" },
};

export const CLIENT_DETAIL_COPY = {
  backToClients: "Clientes",
  edit: "Editar",
  newJob: "Nuevo trabajo",
  jobsTitle: "Trabajos",
  addJob: "+ Nuevo trabajo",
  emptyJobs: "Este cliente todavía no tiene trabajos.",
  emptyJobsHint: "Crea el primero para empezar a pautar sus lanzamientos.",
  notFoundTitle: "Cliente no encontrado",
  notFoundHint: "El cliente no existe o se eliminó del panel.",
  backToClientsAction: "Volver a Clientes",
} as const;

/** Encabezados de la tabla de trabajos, en el orden del diseño. */
export const JOB_TABLE_HEADERS = {
  song: "CANCIÓN",
  platforms: "PLATAFORMAS",
  status: "ESTADO",
  reportLink: "ENLACE DEL CLIENTE",
} as const;

/** Métricas del cliente, con su etiqueta tal como aparece en `B3`. */
export const CLIENT_METRIC_LABELS = {
  totalJobs: "Trabajos totales",
  activeJobs: "Activos",
  totalInvestment: "Inversión total",
  sharedLinks: "Enlaces compartidos",
} as const;
