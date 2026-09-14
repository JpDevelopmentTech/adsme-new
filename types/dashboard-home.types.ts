import type { ReactNode } from "react";
import type { KpiDeltaTone, KpiTone } from "@/constants/dashboard.constants";
import type {
  ActivityItem,
  DashboardAlert,
  DashboardMetrics,
  MonthSpend,
  PlatformShare,
  SpendDay,
} from "@/domain/entities/dashboard";
import type { JobListing } from "@/domain/entities/job-listing";

export interface KpiCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  tone: KpiTone;
  /** Cifra destacada bajo el valor; se omite cuando no hay con qué comparar. */
  delta?: string;
  deltaLabel?: string;
  deltaTone?: KpiDeltaTone;
  /** Sustituye a la línea de delta; lo usa el riel de ritmo del KPI principal. */
  footer?: ReactNode;
  /** Halo de color tras el valor, reservado a la métrica principal. */
  glow?: boolean;
}

export interface KpiRowProps {
  metrics: DashboardMetrics;
  spend: MonthSpend;
}

export interface PacingRailProps {
  /** Parte del plan mensual que cae en los días ya transcurridos. */
  spendPercent: number;
  /** Parte del mes ya transcurrida, que marca el ritmo esperado. */
  calendarPercent: number;
  caption: string;
}

export interface PanelCardProps {
  title: string;
  icon?: ReactNode;
  /** Contador junto al título, como la píldora de alertas del diseño. */
  count?: number;
  seeAllHref?: string;
  isEmpty: boolean;
  emptyText: string;
  children?: ReactNode;
}

export interface ActiveCampaignsPanelProps {
  jobs: JobListing[];
}

export interface AlertsPanelProps {
  alerts: DashboardAlert[];
}

/** El feed de actividad ya no vive en el dashboard; el panel espera su sección. */
export interface ActivityPanelProps {
  items: ActivityItem[];
  /** Momento de render, para calcular «hace X» sin desajustes de hidratación. */
  now: string;
}

export interface MonthSpendChartProps {
  spend: MonthSpend;
}

export interface SpendColumnProps {
  day: SpendDay;
  /** Importe del día más alto del mes, que fija la altura máxima de la barra. */
  max: number;
}

export interface SpendLegendProps {
  hasUnassigned: boolean;
}

export interface PlatformsPanelProps {
  platforms: PlatformShare[];
}

export interface PlatformShareRowProps {
  share: PlatformShare;
}
