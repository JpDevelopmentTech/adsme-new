import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { NominaShowProgress } from "@/domain/entities/nomina-artist";
import type { NominaBucketAmount, NominaDailyPoint } from "@/domain/entities/nomina-bucket";

/** Niveles del veredicto de rentabilidad. */
export type ProfitLevel = "sinUtilidad" | "bajo" | "ajustado" | "rentable" | "muyRentable";

export interface NominaTopbarProps {
  title: string;
  subtitle?: string;
  /** Muestra el buscador y la campana, como en Resumen y Artistas. */
  hasSearch?: boolean;
  /** Acción principal a la derecha (botón o selector). */
  action?: ReactNode;
}

export interface NominaPanelProps {
  title?: string;
  subtitle?: string;
  /** Vidrio grueso para lo que se lee en filas (tablas). */
  isThick?: boolean;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

export interface NominaKpiCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  iconColor?: string;
  note?: string;
  valueClassName?: string;
  children?: ReactNode;
}

export interface SplitBarProps {
  parts: NominaBucketAmount[];
  height?: number;
  label?: string;
}

export interface ShowRulerProps {
  progress: NominaShowProgress;
  /** Alto de las barras hasta el mínimo y después de él. */
  size?: "sm" | "md";
}

export interface ProfitLevelBadgeProps {
  level: ProfitLevel;
}

export interface DeltaBadgeProps {
  /** Variación en porcentaje; positiva o negativa. */
  value: number;
  comparison: string;
}

export interface MiniStatProps {
  label: string;
  value: string;
  sub?: string;
}

export interface TabLinkItem {
  label: string;
  href: string;
  isActive: boolean;
}

export interface TabLinksProps {
  label: string;
  items: TabLinkItem[];
  className?: string;
}

/** Muestra de una leyenda: cuadrado, línea continua o discontinua. */
export type LegendSwatch = "square" | "line" | "dash" | "dot";

export interface ChartLegendItem {
  label: string;
  color: string;
  swatch?: LegendSwatch;
}

export interface ChartLegendProps {
  items: ChartLegendItem[];
}

export interface DistributionCardProps {
  title: string;
  subtitle: string;
  parts: NominaBucketAmount[];
  /** Incluye la opción de barras verticales, como en el perfil. */
  hasVerticalBars?: boolean;
}

export interface PerformanceChartProps {
  title: string;
  subtitle: string;
  points: NominaDailyPoint[];
  /** Mes en curso `AAAA-MM`, desde el que se cuentan los rangos. */
  currentMonth: string;
}


export interface NominaFooterProps {
  className?: string;
}
