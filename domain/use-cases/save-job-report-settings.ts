import type { JobReportSettings } from "@/domain/entities/job-report-settings";
import type { JobReportSettingsRepository } from "@/domain/interfaces/job-report-settings-repository";

/**
 * Caso de uso: guardar la configuración del reporte. Apagar la optimización
 * descarta el CPV cobrado, igual que apagar la clave del enlace la retira: un
 * valor que no surte efecto no debe quedarse guardado como si lo hiciera.
 */
export function createSaveJobReportSettings(
  repository: JobReportSettingsRepository,
) {
  return async function saveJobReportSettings(
    jobId: string,
    settings: JobReportSettings,
  ): Promise<boolean> {
    return repository.saveSettings(jobId, {
      cpvOptimization: settings.cpvOptimization,
      chargedCpv: settings.cpvOptimization ? settings.chargedCpv : null,
      hiddenSections: [...new Set(settings.hiddenSections)],
    });
  };
}
