import { CLIENTS_ROUTE, JOBS_ROUTE, NEW_CLIENT_ROUTE, NEW_JOB_ROUTE } from "@/constants/routes.constants";

export const DASHBOARD_COPY = {
  title: "Dashboard",
  activeCampaigns: "Trabajos con mayor inversión",
  activeCampaignsSubtitle: "Los que más presupuesto concentran en el período",
  activity: "Actividad reciente",
  alerts: "Requiere atención",
  alertsSubtitle: "Lo que pide una decisión hoy",
  spend: "Inversión por día",
  platforms: "Cómo se reparte la inversión",
  connections: "Conexiones",
  quickActions: "Accesos rápidos",
  seeAll: "Ver todas",
  today: "hoy",
  /** Leyenda del trazo discontinuo: el reparto de los días que faltan del período. */
  forecast: "Previsto",
  unassigned: "Sin plataforma",
  notConnected: "Sin conectar",
  expiredToken: "Token caducado",
  noCampaigns: "Ningún trabajo tiene pauta en este período.",
  noActivity: "Todavía no hay actividad.",
  noAlerts: "Nada que revisar. Todo en orden.",
  noSpend: "Ningún trabajo tiene inversión repartida en este período.",
  spentToDate: "gastados hasta hoy",
  plannedPeriod: "previstos en el período",
  peakPerDay: "al día como máximo",
  plannedSplit: "repartidos",
  noSync: "Sin sincronizaciones todavía · conecta una cuenta para importar métricas",
  /** Versión corta para el rótulo micro del KPI principal. */
  noSyncShort: "Sin sincronizar",
  synced: "Sincronizado",
} as const;

/** Los cuatro KPI de `B1`, en el orden en que los lee el usuario; todos del período. */
export const KPI_COPY = {
  investment: "Inversión",
  views: "Reproducciones",
  viewsLabel: "de las campañas importadas",
  campaigns: "Pautas del período",
  campaignsLabel: "trabajos sin vincular",
  campaignsFallback: "pautas por plataforma",
  clients: "Clientes con pauta",
  clientsLabel: (jobs: number) => (jobs === 1 ? "1 trabajo en el período" : `${jobs} trabajos en el período`),
} as const;

/** Cuántas filas del panel de campañas caben sin que la tarjeta crezca de más. */
export const MAX_DASHBOARD_CAMPAIGNS = 5;

/** Tonos de los accesos rápidos: monocromos, la rampa marca el orden de uso. */
export const KPI_TONES = {
  violet: { chip: "bg-ink", icon: "text-g-50" },
  magenta: { chip: "bg-g-700", icon: "text-g-50" },
  cyan: { chip: "bg-g-600", icon: "text-g-50" },
  lime: { chip: "bg-g-500", icon: "text-g-50" },
} as const;

export type KpiTone = keyof typeof KPI_TONES;

export const QUICK_ACTIONS = [
  { label: "Nuevo trabajo", href: NEW_JOB_ROUTE, tone: "violet" },
  { label: "Nuevo cliente", href: NEW_CLIENT_ROUTE, tone: "cyan" },
  { label: "Ver trabajos", href: JOBS_ROUTE, tone: "magenta" },
  { label: "Ver clientes", href: CLIENTS_ROUTE, tone: "lime" },
] as const;

/** Cabeceras de la tabla de trabajos del dashboard, en su orden de lectura. */
export const JOBS_TABLE_COLUMNS = {
  job: "Trabajo",
  period: "Período",
  platforms: "Pauta",
  investment: "Inversión",
  status: "Estado",
} as const;
