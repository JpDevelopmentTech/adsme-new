import type { DASHBOARD_PERIOD_PRESETS } from "@/constants/dashboard-period.constants";
import type { DashboardPeriod } from "@/domain/entities/dashboard-period";

/** Clave de un período rápido. */
export type DashboardPresetKey = (typeof DASHBOARD_PERIOD_PRESETS)[number]["key"];

/** Un período rápido ya resuelto a fechas, con el enlace que lo aplica. */
export interface DashboardPresetOption {
  key: DashboardPresetKey;
  label: string;
  period: DashboardPeriod;
  href: string;
}

export interface DashboardPeriodBarProps {
  period: DashboardPeriod;
  presets: DashboardPresetOption[];
  /** Motivo por el que se ignoraron las fechas de la URL; `null` si valían. */
  error: string | null;
}

export interface PeriodPresetsProps {
  presets: DashboardPresetOption[];
  period: DashboardPeriod;
}
