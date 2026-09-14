import type { JobPlatform } from "@/domain/entities/job";

/** Lo mínimo para repartir: el importe y entre cuántas plataformas se divide. */
interface SplittableJob {
  platforms: JobPlatform[];
  investment: number;
}

/**
 * Parte de la inversión de un trabajo que corresponde a cada una de sus
 * plataformas. Un trabajo sin plataformas vinculadas no aporta a ninguna.
 */
export function splitJobInvestment(job: SplittableJob): number {
  return job.platforms.length > 0 ? job.investment / job.platforms.length : 0;
}
