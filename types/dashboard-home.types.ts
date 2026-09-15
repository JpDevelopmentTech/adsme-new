import type { ReactNode } from "react";
import type {
  ActivityItem,
  DashboardAlert,
  DashboardMetrics,
  MonthSpend,
  SpendDay,
} from "@/domain/entities/dashboard";
import type { JobListing } from "@/domain/entities/job-listing";

export interface KpiCardProps {
  label: string;
  value: string;
  /** Contexto bajo la cifra: qué hace buena o mala noticia a ese número. */
  note?: string;
  /** Marca de tinta junto al pie cuando el dato pide una acción. */
  isFlagged?: boolean;
  /** Sustituye a la línea de pie; lo usa el riel de ritmo del KPI principal. */
  footer?: ReactNode;
}

/** El panel oscuro que abre `B1`: cifra del mes, ritmo y gráfica en un objeto. */
export interface MonthHeroProps {
  metrics: DashboardMetrics;
  spend: MonthSpend;
  /** Estado de la última importación de métricas, rotulado en micro. */
  status: string;
}

export interface PortfolioStripProps {
  metrics: DashboardMetrics;
}

export interface PortfolioStatProps {
  label: string;
  value: string;
  note: string;
  /** Punto de acento junto al pie cuando el dato pide una acción. */
  isFlagged?: boolean;
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
  subtitle?: string;
  icon?: ReactNode;
  /** Contador junto al título, como el cuadro de alertas del diseño. */
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

export interface SpendPlotProps {
  spend: MonthSpend;
  /** Importe del día más alto del mes, que fija la altura máxima de la barra. */
  max: number;
  /** Descripción de la serie para quien no ve las barras. */
  label: string;
}

export interface SpendAxisProps {
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
