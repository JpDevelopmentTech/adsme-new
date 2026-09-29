import type { JobReportSettings } from "@/domain/entities/job-report-settings";

/** Port de la configuración del reporte de un trabajo. */
export interface JobReportSettingsRepository {
  /** Devuelve la configuración del trabajo, o `null` si no existe o no es del usuario. */
  getSettings(jobId: string): Promise<JobReportSettings | null>;

  /** Guarda la configuración; devuelve si la base la aceptó. */
  saveSettings(jobId: string, settings: JobReportSettings): Promise<boolean>;
}
