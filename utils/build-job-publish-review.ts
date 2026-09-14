import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_SECTIONS } from "@/constants/report-config.constants";
import { JOB_REVIEW_LABELS } from "@/constants/job-wizard.constants";
import type { Job } from "@/domain/entities/job";
import type { StatStripItem } from "@/types/ui.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatJobPeriod } from "@/utils/format-job-period";

/** Secciones del reporte que van activadas de salida. */
function countActiveSections(): string {
  const [sections] = REPORT_SECTIONS;
  const active = sections.options.filter((option) => option.on).length;

  return active === 1 ? "1 sección" : `${active} secciones`;
}

/** Resumen de lo que se publicará, en el orden en que se fue configurando. */
export function buildJobPublishReview(
  job: Job,
  clientName: string,
): StatStripItem[] {
  return [
    { label: JOB_REVIEW_LABELS.song, value: job.title },
    { label: JOB_REVIEW_LABELS.client, value: clientName || "—" },
    { label: JOB_REVIEW_LABELS.period, value: formatJobPeriod(job.startsOn, job.endsOn) },
    {
      label: JOB_REVIEW_LABELS.investment,
      value: formatCompactCurrency(job.investment),
    },
    {
      label: JOB_REVIEW_LABELS.platforms,
      value:
        job.platforms.length > 0
          ? job.platforms
              .map((platform) => PLATFORM_META[platform].label)
              .join(" · ")
          : JOB_REVIEW_LABELS.noPlatforms,
    },
    { label: JOB_REVIEW_LABELS.report, value: countActiveSections() },
  ];
}
