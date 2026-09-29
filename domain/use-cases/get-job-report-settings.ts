import {
  DEFAULT_JOB_REPORT_SETTINGS,
  type JobReportSettings,
} from "@/domain/entities/job-report-settings";
import type { JobReportSettingsRepository } from "@/domain/interfaces/job-report-settings-repository";

/**
 * Caso de uso: leer la configuración del reporte de un trabajo. Si no hay
 * nada guardado se parte de los valores por defecto, con todo apagado.
 */
export function createGetJobReportSettings(
  repository: JobReportSettingsRepository,
) {
  return async function getJobReportSettings(
    jobId: string,
  ): Promise<JobReportSettings> {
    return (await repository.getSettings(jobId)) ?? DEFAULT_JOB_REPORT_SETTINGS;
  };
}
