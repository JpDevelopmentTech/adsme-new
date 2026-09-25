import type { FilterOption } from "@/constants/client-filters.constants";
import type { CampaignListQuery } from "@/domain/entities/campaign";
import type { CampaignState } from "@/types/campaigns-list.types";

export const CAMPAIGNS_COPY = {
  searchPlaceholder: "Buscar campaña o ID…",
  count: (total: number) => (total === 1 ? "1 CAMPAÑA" : `${total} CAMPAÑAS`),
  results: (shown: number, total: number) => `${shown} DE ${total}`,
  linkAll: "Vincular campañas",
  unlinkedTitle: "Sin vincular",
  groupMeta: (count: number, spend: string) =>
    `${count === 1 ? "1 campaña" : `${count} campañas`} · ${spend}`,
  seeJob: "Ver trabajo",
  linkSelected: (count: number) =>
    count === 1 ? "Vincular 1 campaña" : `Vincular ${count} campañas`,
  selectRow: (name: string) => `Seleccionar ${name}`,
  linkRow: (name: string) => `Vincular ${name} a un trabajo`,
  moveRow: (name: string) => `Mover ${name} a otro trabajo`,
  empty: "Todavía no ha entrado ninguna campaña. Sincroniza desde Conexiones.",
  emptyFiltered: "Ninguna campaña coincide con estos filtros.",
} as const;

/** Textos de la banda. El titular es un estado, así que cambia con el reparto. */
export const CAMPAIGNS_SPLIT_COPY = {
  eyebrow: "REPARTO DE LO IMPORTADO",
  clear: "Todo lo importado ya cuenta para un cliente",
  pending: (amount: string) => `${amount} no están alimentando ningún reporte`,
  clearDetail: (count: number) =>
    `${count === 1 ? "La única campaña importada está vinculada" : `Las ${count} campañas importadas están vinculadas`} a su trabajo`,
  pendingDetail: (unlinked: number, total: number) =>
    `${unlinked} de ${total} campañas siguen sin trabajo · lo demás ya cuenta para su cliente`,
  linked: (amount: string) => `Vinculado · ${amount}`,
  unlinked: (amount: string) => `Sin vincular · ${amount}`,
} as const;

/** Textos del diálogo que cierra el flujo de vinculación. */
export const LINK_DIALOG_COPY = {
  title: "Vincular a un trabajo",
  subtitle: (count: number) =>
    count === 1
      ? "Esta campaña pasará a contar en el reporte de ese trabajo."
      : `Estas ${count} campañas pasarán a contar en el reporte de ese trabajo.`,
  targetLabel: "TRABAJO DE DESTINO",
  targetPlaceholder: "Elige el trabajo",
  selectedLabel: (count: number) => `CAMPAÑAS SELECCIONADAS · ${count}`,
  note: "Sus métricas se importan y se refrescan cada hora, igual que las demás.",
  cancel: "Cancelar",
  remove: (name: string) => `Quitar ${name}`,
} as const;

/** Cabeceras de la tabla, en el mismo orden que `CAMPAIGN_COLUMN_WIDTHS`. */
export const CAMPAIGN_TABLE_COLUMNS = {
  campaign: "CAMPAÑA",
  account: "CUENTA",
  state: "ESTADO",
  period: "PERÍODO",
  reach: "ALCANCE",
  spend: "INVERSIÓN",
} as const;

/**
 * Reparto de la fila, en píxeles como en el `.pen`. Va en anchos fijos —y no en
 * porcentajes como `B5`— porque aquí las columnas son cortas y estables: lo que
 * debe ceder ancho es el nombre de la campaña, que es lo único variable.
 */
export const CAMPAIGN_COLUMN_WIDTHS = {
  check: "w-[18px]",
  account: "w-[140px]",
  state: "w-[100px]",
  period: "w-[112px]",
  reach: "w-[92px]",
  spend: "w-[100px]",
  actions: "w-10",
} as const;

/** Etiqueta de cada estado, ya en el idioma del usuario. */
export const CAMPAIGN_STATE_LABELS: Record<CampaignState, string> = {
  active: "Activa",
  paused: "En pausa",
  ended: "Finalizada",
};

export const CAMPAIGN_QUERY_PARAMS = {
  search: "q",
  connection: "conexion",
  link: "vinculo",
} as const;

/** Prefijos con los que los chips de filtro dicen qué filtran. */
export const CAMPAIGN_FILTER_PREFIXES = { connection: "Cuenta" } as const;

export const CAMPAIGN_LINK_OPTIONS: FilterOption<CampaignListQuery["link"]>[] = [
  { value: "all", label: "Todas" },
  { value: "unlinked", label: "Sin vincular" },
  { value: "linked", label: "Vinculadas" },
];

/** Opción que no filtra por cuenta; las demás las aportan las conexiones. */
export const ALL_ACCOUNTS_OPTION = { value: "all", label: "Todas las cuentas" };
