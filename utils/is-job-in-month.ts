import { endOfMonth, startOfMonth } from "@/utils/month-range";

/** Período ISO de una pauta. */
interface DatedJob {
  startsOn: string;
  endsOn: string;
}

/**
 * Un trabajo cuenta en el mes si su período se solapa con él, aunque haya
 * empezado antes o termine después. Es el mismo criterio que usa `B1`.
 */
export function isJobInMonth(job: DatedJob, now: Date): boolean {
  return job.startsOn <= endOfMonth(now) && job.endsOn >= startOfMonth(now);
}
