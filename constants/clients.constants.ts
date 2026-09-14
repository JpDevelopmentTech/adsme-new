import type { ClientStatus } from "@/domain/entities/client";
import type { StatusTone } from "@/types/ui.types";

/** Etiqueta y tono del badge de estado de cada cliente, según el diseño de `B2`. */
export const CLIENT_STATUS_BADGE: Record<
  ClientStatus,
  { label: string; tone: StatusTone }
> = {
  active: { label: "Activo", tone: "success" },
  paused: { label: "Pausado", tone: "warning" },
  empty: { label: "Sin trabajos", tone: "muted" },
};

export const CLIENT_MENU_COPY = {
  edit: "Editar cliente",
  delete: "Eliminar",
  cancel: "Cancelar",
  deleteTitle: "Eliminar cliente",
  deleteDescription: (name: string) =>
    `Se eliminará «${name}» junto con su foto. Esta acción no se puede deshacer.`,
} as const;

export const CLIENTS_EMPTY_COPY = {
  title: "Aún no tienes clientes",
  subtitle:
    "Crea tu primer cliente para empezar a gestionar sus lanzamientos y campañas. Podrás asociarle trabajos y compartir reportes en vivo.",
  action: "Crear primer cliente",
} as const;

/** Cifras de la banda de cabecera del listado. */
export const CLIENTS_SUMMARY_COPY = {
  clients: "Clientes",
  results: "Resultados",
  withActiveJobs: "Con trabajos activos",
  liveCampaigns: "Campañas en vivo",
  monthInvestment: (month: string) => `Inversión de ${month.toLowerCase()}`,
} as const;

/** Textos de la tarjeta de cliente. */
export const CLIENT_CARD_COPY = {
  investedIn: (month: string) => `Invertido en ${month.toLowerCase()}`,
  activeJobs: (count: number) =>
    count === 1 ? "1 activo" : `${count} activos`,
  totalJobs: (count: number) =>
    count === 1 ? "de 1 trabajo" : `de ${count} trabajos`,
  noCampaigns: "Sin campañas activas",
  lastActivity: (relative: string) => `Última actividad ${relative}`,
  addedAt: (relative: string) => `Añadido ${relative}`,
} as const;

export const CLIENTS_COPY = {
  title: "Clientes",
  newClient: "Nuevo cliente",
  searchPlaceholder: "Buscar por nombre o @usuario…",
  filterStatus: "Filtrar por estado",
  filterKind: "Tipo: Todos",
  sort: "Recientes",
} as const;
