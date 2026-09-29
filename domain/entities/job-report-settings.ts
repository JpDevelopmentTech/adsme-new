import type { ReportSection } from "@/domain/entities/report-section";

/**
 * Configuración del reporte de un trabajo (paso 3 del asistente): qué partes
 * ve el cliente y la optimización de CPV.
 */
export interface JobReportSettings {
  cpvOptimization: boolean;
  /** CPV cobrado al cliente, en COP; `null` mientras la optimización esté apagada. */
  chargedCpv: number | null;
  /** Secciones que el cliente no ve; vacío significa que lo ve todo. */
  hiddenSections: ReportSection[];
}

export const DEFAULT_JOB_REPORT_SETTINGS: JobReportSettings = {
  cpvOptimization: false,
  chargedCpv: null,
  hiddenSections: [],
};
