import type { Job } from "@/domain/entities/job";
import type { JobBasicsValues } from "@/types/job-wizard.types";
import { formatThousands } from "@/utils/format-thousands";

/** Proyecta un trabajo existente sobre los campos editables del paso 1. */
export function toJobBasicsValues(job: Job): JobBasicsValues {
  return {
    title: job.title,
    clientId: job.clientId,
    format: job.format,
    startsOn: job.startsOn,
    endsOn: job.endsOn,
    investment: job.investment > 0 ? formatThousands(String(job.investment)) : "",
    description: job.description,
  };
}
