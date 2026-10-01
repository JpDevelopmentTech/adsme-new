import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type {
  ActivityItem,
  DashboardMetrics,
  PeriodSpend,
} from "@/domain/entities/dashboard";
import type { JobListing } from "@/domain/entities/job-listing";

export interface KpiCardProps {
  /** Icono de la cifra, en su cuadro de vidrio junto al rótulo. */
  icon?: LucideIcon;
  label: string;
  value: string;
  /** Contexto bajo la cifra: qué hace buena o mala noticia a ese número. */
  note?: string;
  /** Marca de tinta junto al pie cuando el dato pide una acción. */
  isFlagged?: boolean;
  /** Sustituye a la línea de pie; lo usa el riel de ritmo del KPI principal. */
  footer?: ReactNode;
}

/** Fila de tarjetas que abre `B1`: la inversión del período y tres cifras de contexto. */
export interface DashboardKpiRowProps {
  metrics: DashboardMetrics;
  spend: PeriodSpend;
  /** Estado de la última importación de métricas, ya redactado. */
  status: string;
  /** Si hubo alguna importación: pinta el punto del estado en verde. */
  isSynced: boolean;
}

export type PeriodInvestmentCardProps = Omit<DashboardKpiRowProps, "metrics">;

/** Cifra y unidad de un importe compacto, para pintar la unidad más pequeña. */
export interface CompactAmountParts {
  value: string;
  unit: string;
}

/** Sentido del ritmo del gasto frente al calendario del período. */
export type PacingDirection = "ahead" | "behind" | "even";

export interface PacingPillProps {
  /** Parte del plan mensual que cae en los días ya transcurridos. */
  spendPercent: number;
  /** Parte del período ya transcurrida, que marca el ritmo esperado. */
  calendarPercent: number;
}

export interface PacingRingsProps extends PacingPillProps {
  elapsedDays: number;
  totalDays: number;
}

export interface KpiTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  /** Punto rojo junto al pie cuando el dato pide una acción. */
  isFlagged?: boolean;
}

export interface SpendPanelProps {
  spend: PeriodSpend;
}

export interface SpendAreaChartProps {
  spend: PeriodSpend;
  /** Descripción de la serie para quien no ve la gráfica. */
  label: string;
}

/** Una serie del área apilada: una plataforma, o la parte sin plataforma. */
export interface SpendChartSeries {
  name: string;
  color: string;
  data: number[];
}

export interface SpendLegendProps {
  hasUnassigned: boolean;
}

export interface PanelCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  /** Contador junto al título. */
  count?: number;
  seeAllHref?: string;
  isEmpty: boolean;
  emptyText: string;
  children?: ReactNode;
}

export interface ActiveCampaignsPanelProps {
  jobs: JobListing[];
}

/** El feed de actividad ya no vive en el dashboard; el panel espera su sección. */
export interface ActivityPanelProps {
  items: ActivityItem[];
  /** Momento de render, para calcular «hace X» sin desajustes de hidratación. */
  now: string;
}
