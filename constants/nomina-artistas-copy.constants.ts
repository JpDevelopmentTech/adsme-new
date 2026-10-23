import type { RosterSortKey } from "@/types/nomina-artistas.types";

/** Textos literales de la pantalla Artistas de la Nómina Plan. */
export const NOMINA_ARTISTAS_COPY = {
  metaTitle: "Artistas · adsme",
  title: "Artistas",
  subtitle: (count: number) => `Roster completo · ${count} ${count === 1 ? "artista" : "artistas"}`,
  profit: (monthName: string) => `Utilidad · ${monthName}`,
  ads: (monthName: string) => `Ads · ${monthName}`,
  services: (monthName: string) => `Servicios · ${monthName}`,
  gross: (monthName: string) => `Ingresos Brutos · ${monthName}`,
  monthNote: "Mes en curso, por Mes Asignado",
  tableLabel: "Roster de artistas",
  client: "Cliente",
  newIncome: "Nuevo ingreso",
  status: "Estado",
  sortBy: (label: string) => `Ordenar por ${label}`,
  hint: "Toca una fila para abrir el perfil del artista. El botón + registra un ingreso sin salir de la lista.",
  emptyTitle: "Tu roster está vacío",
  emptyDescription: "Inscribe a uno de tus clientes para empezar a registrar ingresos.",
} as const;

/** Rótulos de las columnas ordenables, en el orden en que aparecen tras «Estado». */
export const ROSTER_SORT_LABELS: Record<RosterSortKey, string> = {
  monthIncome: "Ingresos mes en curso",
  monthEvents: "# Eventos",
  grossTotal: "Ingresos Brutos (total)",
  labelProfitTotal: "Utilidad Sello (total)",
  nomina: "Nómina",
  availableBudget: "Presupuesto Disponible",
  joinedAt: "Fecha de ingreso",
};

/** Sentido que espera `aria-sort` en la columna que ordena la tabla. */
export const ROSTER_ARIA_SORT = { asc: "ascending", desc: "descending" } as const;
