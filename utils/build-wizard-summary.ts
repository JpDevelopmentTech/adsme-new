import { JOB_WIZARD_SUMMARY } from "@/constants/job-wizard.constants";
import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import type { Job } from "@/domain/entities/job";
import type { JobWizardSummaryData } from "@/types/job-wizard.types";
import { formatInvestmentSummary } from "@/utils/format-investment-summary";
import { formatPeriodSummary } from "@/utils/format-period-summary";

/**
 * Ficha del trabajo para los pasos que ya tienen uno guardado. Lo que falta se
 * deja en `null` a propósito: la ficha muestra «Pendiente» y así se ve de un
 * vistazo cuánto queda por decidir.
 */
export function buildWizardSummary(
  job: Job,
  clientName: string | null,
  linkedPlatforms: number,
): JobWizardSummaryData {
  return {
    title: job.title || null,
    clientName,
    format: job.format,
    coverUrl: job.coverUrl,
    period: formatPeriodSummary(job.startsOn, job.endsOn),
    investment: formatInvestmentSummary(
      job.investment,
      job.startsOn,
      job.endsOn,
    ),
    platforms:
      linkedPlatforms > 0
        ? JOB_WIZARD_SUMMARY.platformsCount(
            linkedPlatforms,
            PLATFORM_ORDER.length,
          )
        : null,
    report: job.reportUrl ? JOB_WIZARD_SUMMARY.reportReady : null,
  };
}
