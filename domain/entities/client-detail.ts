import type { Client } from "@/domain/entities/client";
import type { Job } from "@/domain/entities/job";

/** Métricas agregadas del cliente, en el mismo orden que las tarjetas de `B3`. */
export interface ClientMetrics {
  totalJobs: number;
  activeJobs: number;
  /** Inversión acumulada en la moneda base del negocio (COP). */
  totalInvestment: number;
  /** Enlaces de reporte compartidos con el cliente, sumando los de cada trabajo. */
  sharedLinks: number;
}

/** Cliente con sus métricas calculadas; es lo que consume la cabecera de `B3`. */
export interface ClientDetail extends Client {
  metrics: ClientMetrics;
}

/** Todo lo que necesita la pantalla de detalle en una sola lectura. */
export interface ClientOverview {
  client: ClientDetail;
  jobs: Job[];
}
