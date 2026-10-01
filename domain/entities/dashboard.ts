import type { JobPlatform } from "@/domain/entities/job";
import type { JobListing } from "@/domain/entities/job-listing";

/** Cifras de contexto del dashboard, todas referidas al período elegido. */
export interface DashboardMetrics {
  clientsTotal: number;
  /** Clientes con algún trabajo cuya pauta toca el período. */
  clientsInPeriod: number;
  /** Trabajos cuya pauta se solapa con el período. */
  jobsInPeriod: number;
  /** Pautas por plataforma configuradas en esos trabajos. */
  campaignsInPeriod: number;
  /** Trabajos del período que todavía no tienen ninguna plataforma vinculada. */
  jobsWithoutPlatforms: number;
  /**
   * Reproducciones de los días del período, sumando la serie diaria importada.
   * Sustituye al alcance: las personas únicas no se pueden sumar entre días.
   */
  viewsInPeriod: number;
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

/** Un día del período ya pasado, el de hoy, o todavía por ejecutar. */
export type SpendDayState = "past" | "today" | "pending";

/**
 * De dónde sale el importe del día: `real` si viene de la serie diaria que se
 * importó de la plataforma, `planned` si es el reparto de lo comprometido.
 */
export type SpendDaySource = "real" | "planned";

export interface SpendDay {
  /** Fecha del día en `YYYY-MM-DD`. */
  date: string;
  state: SpendDayState;
  source: SpendDaySource;
  byPlatform: Record<JobPlatform, number>;
  /** Parte que aportan trabajos sin ninguna plataforma vinculada. */
  unassigned: number;
  total: number;
}

/**
 * Inversión día a día del período: gasto real hasta hoy —desde
 * `campaign_daily_metrics`— y reparto de lo comprometido para lo que queda.
 */
export interface PeriodSpend {
  /** Período ya rotulado: «Octubre» o «15 Sep–14 Oct». */
  label: string;
  totalDays: number;
  /** Días del período ya transcurridos, hoy incluido; separa lo ejecutado del plan. */
  elapsedDays: number;
  /** Hoy en `YYYY-MM-DD` si cae dentro del período; `null` si no. */
  today: string | null;
  days: SpendDay[];
  /** Suma de todo el período, mezclando lo ya gastado con lo aún planificado. */
  planned: number;
  /** Gasto real acumulado de los días que sí tienen serie importada. */
  spent: number;
  /** Parte que cae en los días ya transcurridos, hoy incluido. */
  toDate: number;
  /** Importe del día más alto: fija la escala vertical de la gráfica. */
  peakAmount: number;
  hasUnassigned: boolean;
  /** Si algún día del período muestra gasto real; con `false` todo es plan. */
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
  /** Trabajos cuya pauta toca el período, para el panel de mayor inversión. */
  periodJobs: JobListing[];
  alerts: DashboardAlert[];
  spend: PeriodSpend;
  platforms: PlatformShare[];
  /** Sincronización más reciente entre todas las conexiones, en ISO. */
  lastSyncedAt: string | null;
}
