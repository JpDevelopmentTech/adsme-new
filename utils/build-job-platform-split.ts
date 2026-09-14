import type { Job } from "@/domain/entities/job";
import type { JobPlatformSplit } from "@/types/job-wizard.types";
import { splitJobInvestment } from "@/utils/split-job-investment";

/**
 * Cómo se reparte la inversión del trabajo entre las plataformas que incluye.
 * El reparto es a partes iguales, igual que en el dashboard y en el listado de
 * clientes: la base de datos no guarda importes por plataforma.
 */
export function buildJobPlatformSplit(job: Job): JobPlatformSplit[] {
  const amount = splitJobInvestment(job);
  const percent = job.platforms.length > 0 ? 100 / job.platforms.length : 0;

  return job.platforms.map((platform) => ({ platform, amount, percent }));
}
