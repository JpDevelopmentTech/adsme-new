import type { ReportSection } from "@/domain/entities/report-section";

/**
 * Configuración del reporte de un trabajo (paso 3 del asistente): qué partes
 * ve el cliente, la optimización de CPV y la TRM para los dólares.
 */
export interface JobReportSettings {
  cpvOptimization: boolean;
  /** CPV cobrado al cliente, en COP; `null` mientras la optimización esté apagada. */
  chargedCpv: number | null;
  /** Secciones que el cliente no ve; vacío significa que lo ve todo. */
  hiddenSections: ReportSection[];
  /**
   * TRM acordada con el cliente, en pesos por dólar, con la que el reporte
   * pasa a pesos el gasto en dólares. `null` si no se convierte: entonces los
   * dólares se enseñan aparte, sin sumarse a los pesos.
   */
  usdCopRate: number | null;
}

export const DEFAULT_JOB_REPORT_SETTINGS: JobReportSettings = {
  cpvOptimization: false,
  chargedCpv: null,
  hiddenSections: [],
  usdCopRate: null,
};
