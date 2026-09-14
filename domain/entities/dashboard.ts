import type { JobPlatform } from "@/domain/entities/job";
import type { JobListing } from "@/domain/entities/job-listing";

export interface DashboardMetrics {
  clientsTotal: number;
  /** Clientes dados de alta en el mes en curso. */
  clientsThisMonth: number;
  activeJobs: number;
  jobsThisMonth: number;
  /** Pautas por plataforma configuradas en los trabajos activos. */
  activeCampaigns: number;
  /** Trabajos activos que todavía no tienen ninguna plataforma vinculada. */
  jobsWithoutPlatforms: number;
  /** Inversión sumada de los trabajos cuyo período toca el mes en curso. */
  monthInvestment: number;
  /** Personas alcanzadas, sumando las campañas ya importadas. */
  reachTotal: number;
}

export type ActivityKind = "client-created" | "job-created" | "job-updated";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  text: string;
  /** Momento del evento en formato ISO. */
  at: string;
}

export type AlertKind =
  | "no-platforms"
  | "overdue"
  | "disconnected"
  | "token-expiring"
  | "no-report-link";

export interface DashboardAlert {
  id: string;
  kind: AlertKind;
  title: string;
  detail: string;
  href: string;
}

/** Un día del mes ya pasado, el de hoy, o todavía por ejecutar. */
export type SpendDayState = "past" | "today" | "pending";

/**
 * De dónde sale el importe del día: `real` si viene de la serie diaria que se
 * importó de la plataforma, `planned` si es el reparto de lo comprometido.
 */
export type SpendDaySource = "real" | "planned";

export interface SpendDay {
  day: number;
  state: SpendDayState;
  source: SpendDaySource;
  byPlatform: Record<JobPlatform, number>;
  /** Parte que aportan trabajos sin ninguna plataforma vinculada. */
  unassigned: number;
  total: number;
}

/**
 * Inversión día a día del mes: gasto real hasta hoy —desde
 * `campaign_daily_metrics`— y reparto de lo comprometido para lo que queda.
 */
export interface MonthSpend {
  monthLabel: string;
  daysInMonth: number;
  /** Día del mes en curso, que separa lo ejecutado de lo pendiente. */
  today: number;
  days: SpendDay[];
  /** Suma de todo el mes, mezclando lo ya gastado con lo aún planificado. */
  planned: number;
  /** Gasto real acumulado de los días que sí tienen serie importada. */
  spent: number;
  /** Parte que cae en los días ya transcurridos, hoy incluido. */
  toDate: number;
  /** Importe del día más alto: fija la escala vertical de la gráfica. */
  peakAmount: number;
  hasUnassigned: boolean;
  /** Si algún día del mes muestra gasto real; con `false` todo es plan. */
  hasReal: boolean;
}

export interface PlatformShare {
  platform: JobPlatform;
  amount: number;
  percent: number;
  activeJobs: number;
  connected: boolean;
  /** Días que faltan para que caduque el token; `null` si no urge o no aplica. */
  tokenExpiresInDays: number | null;
}

export interface DashboardSummary {
  metrics: DashboardMetrics;
  /** Trabajos en curso, para el panel de campañas activas. */
  activeJobs: JobListing[];
  alerts: DashboardAlert[];
  monthSpend: MonthSpend;
  platforms: PlatformShare[];
  /** Sincronización más reciente entre todas las conexiones, en ISO. */
  lastSyncedAt: string | null;
}
