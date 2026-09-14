import { CLIENTS_ROUTE, JOBS_ROUTE, NEW_CLIENT_ROUTE, NEW_JOB_ROUTE } from "@/constants/routes.constants";

export const DASHBOARD_COPY = {
  title: "Dashboard",
  activeCampaigns: "Campañas con mayor inversión",
  activity: "Actividad reciente",
  alerts: "Requiere atención",
  spend: "Inversión por día",
  platforms: "Plataformas",
  platformsSubtitle: "Reparto de la inversión",
  connections: "Conexiones",
  quickActions: "Accesos rápidos",
  seeAll: "Ver todas",
  today: "hoy",
  unassigned: "Sin plataforma",
  notConnected: "Sin conectar",
  expiredToken: "Token caducado",
  noCampaigns: "No hay trabajos en curso.",
  noActivity: "Todavía no hay actividad.",
  noAlerts: "Nada que revisar. Todo en orden.",
  noSpend: "Ningún trabajo tiene inversión repartida en este mes.",
  spentToDate: "gastados hasta hoy",
  plannedMonth: "previstos en el mes",
  peakPerDay: "al día como máximo",
  plannedSplit: "repartidos",
  noSync: "Sin sincronizaciones todavía · conecta una cuenta para importar métricas",
} as const;

/** Los cuatro KPI de `B1`, en el orden en que los lee el usuario. */
export const KPI_COPY = {
  investment: "Inversión del mes",
  reach: "Alcance acumulado",
  reachLabel: "personas alcanzadas",
  campaigns: "Campañas activas",
  campaignsLabel: "sin vincular",
  campaignsFallback: "pautas por plataforma",
  clients: "Clientes activos",
  clientsLabel: "trabajos en curso",
} as const;

/** Cuántas filas del panel de campañas caben sin que la tarjeta crezca de más. */
export const MAX_DASHBOARD_CAMPAIGNS = 5;

/** Los cuatro KPI de `B1`, con el color de su chip y el halo del valor. El halo
 *  va a un tercio de opacidad: sobre las superficies claras del tema, un glow
 *  más denso emborrona la cifra en vez de acentuarla. */
export const KPI_TONES = {
  violet: { chip: "bg-brand-violet/12", icon: "text-brand-violet", glow: "#7C3AED33" },
  magenta: { chip: "bg-brand-magenta/15", icon: "text-brand-magenta", glow: "#DB277733" },
  cyan: { chip: "bg-data-cyan/12", icon: "text-data-cyan", glow: "#0891B233" },
  lime: { chip: "bg-data-lime/12", icon: "text-data-lime", glow: "#4D7C0F33" },
} as const;

export type KpiTone = keyof typeof KPI_TONES;

/** Color del delta según lo que comunique: neutro, positivo o pendiente. */
export const KPI_DELTA_TONES = {
  neutral: "text-text-primary",
  success: "text-success",
  warning: "text-warning",
} as const;

export type KpiDeltaTone = keyof typeof KPI_DELTA_TONES;

export const QUICK_ACTIONS = [
  { label: "Nuevo trabajo", href: NEW_JOB_ROUTE, tone: "violet" },
  { label: "Nuevo cliente", href: NEW_CLIENT_ROUTE, tone: "cyan" },
  { label: "Ver trabajos", href: JOBS_ROUTE, tone: "magenta" },
  { label: "Ver clientes", href: CLIENTS_ROUTE, tone: "lime" },
] as const;
