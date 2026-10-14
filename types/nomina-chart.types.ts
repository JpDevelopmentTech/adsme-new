import type { ApexOptions } from "apexcharts";
import type { LucideIcon } from "lucide-react";

/** Formas de ver la distribución del mes. */
export type DistributionView = "dona" | "vertical" | "horizontal";

/** Rangos de la curva de rendimiento. */
export type PerformanceRange = "1M" | "3M" | "6M" | "1A" | "Todo";

/** Serie que acepta ApexCharts: una lista de valores o varias series con nombre. */
export type ApexSeries = ApexOptions["series"];

export interface ApexChartProps {
  type: "area" | "bar" | "donut" | "line";
  height: number;
  options: ApexOptions;
  series: NonNullable<ApexSeries>;
  /** Descripción de la gráfica para lectores de pantalla. */
  label: string;
}

export interface IconToggleOption<TValue extends string> {
  value: TValue;
  label: string;
  icon: LucideIcon;
}

export interface IconToggleGroupProps<TValue extends string> {
  label: string;
  value: TValue;
  options: IconToggleOption<TValue>[];
  onChange: (value: TValue) => void;
}
