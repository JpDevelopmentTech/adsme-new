import type { Client } from "@/domain/entities/client";
import type { JobPlatform, JobStatus } from "@/domain/entities/job";

/**
 * Lo que el listado necesita saber de cada trabajo del cliente. Es un subconjunto
 * de `Job`: el listado nunca muestra títulos ni portadas, solo agrega importes.
 */
export interface ClientJobSummary {
  status: JobStatus;
  platforms: JobPlatform[];
  investment: number;
  /** Período de la pauta en formato ISO (`YYYY-MM-DD`). */
  startsOn: string;
  endsOn: string;
  updatedAt: string;
}

/** Cliente tal como lo lee el repositorio, con el resumen de sus trabajos. */
export interface ClientRecord extends Client {
  jobs: ClientJobSummary[];
}

/** Parte de la inversión del mes que se lleva una plataforma. */
export interface ClientPlatformShare {
  platform: JobPlatform;
  amount: number;
  percent: number;
}

/**
 * Cliente con lo que muestra la tarjeta de `B2`: cuánto se está invirtiendo
 * este mes en él y cómo se reparte entre plataformas.
 */
export interface ClientListing extends Client {
  /** Inversión de los trabajos cuyo período toca el mes en curso. */
  monthInvestment: number;
  platformShares: ClientPlatformShare[];
  /** Pautas por plataforma configuradas en sus trabajos activos. */
  activeCampaigns: number;
}
