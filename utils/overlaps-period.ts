import type { DashboardPeriod } from "@/domain/entities/dashboard-period";
import type { Job } from "@/domain/entities/job";

/** Si la pauta del trabajo comparte al menos un día con el período. */
export function overlapsPeriod(
  job: Pick<Job, "startsOn" | "endsOn">,
  period: DashboardPeriod,
): boolean {
  return job.startsOn <= period.to && job.endsOn >= period.from;
}
