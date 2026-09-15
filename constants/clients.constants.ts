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

/** Textos de la fila de cliente. */
export const CLIENT_ROW_COPY = {
  jobs: (active: number, total: number) =>
    total === 1
      ? `${active} de 1 trabajo`
      : `${active} de ${total} trabajos`,
  noJobs: "sin trabajos",
  noCampaigns: "Sin campañas activas",
  lastActivity: (relative: string) => `actividad ${relative}`,
  /** Un cliente en pausa no tiene «actividad»: tiene tiempo parado. */
  stale: (relative: string) => `sin cambios ${relative}`,
  addedAt: (relative: string) => `añadido ${relative}`,
  noInvestment: "—",
} as const;

/** Cabeceras de la tabla de cartera, en su orden de lectura. */
export const CLIENTS_TABLE_COLUMNS = {
  client: "Cliente",
  investment: "Inversión del mes",
  jobs: "Trabajos",
  status: "Estado",
} as const;

/** Textos de la banda de cartera que encabeza el listado. */
export const PORTFOLIO_COPY = {
  eyebrow: (month: string) => `Cartera de ${month.toLowerCase()}`,
  spread: (count: number) =>
    count === 1 ? "en 1 cliente" : `repartidos entre ${count} clientes`,
  working: (count: number) => `${count} trabajando`,
  paused: (count: number) => `${count} en pausa`,
  empty: (count: number) => `${count} sin trabajos`,
  liveCampaigns: (count: number) =>
    count === 1 ? "1 campaña en vivo" : `${count} campañas en vivo`,
  more: (count: number) => `+${count}`,
  stackLabel: "Clientes de la cartera",
} as const;

/** Caras que se apilan antes de resumir el resto en un «+N». */
export const MAX_STACKED_AVATARS = 5;

export const CLIENTS_COPY = {
  title: "Clientes",
  count: (total: number) => (total === 1 ? "1 cliente" : `${total} clientes`),
  results: (total: number) =>
    total === 1 ? "1 resultado" : `${total} resultados`,
  newClient: "Nuevo cliente",
  searchPlaceholder: "Buscar por nombre o @usuario…",
  filterStatus: "Filtrar por estado",
  filterKind: "Tipo: Todos",
  sort: "Recientes",
} as const;
