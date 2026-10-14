import type { NominaArtistSummary, NominaShowProgress } from "@/domain/entities/nomina-artist";
import type { NominaBucketAmount, NominaDailyPoint } from "@/domain/entities/nomina-bucket";

/** Cifras del mes en curso para el roster completo. */
export interface NominaMonthKpis {
  grossIncome: number;
  profit: number;
  investment: number;
  service: number;
  taxes: number;
  /** Cuántos artistas tienen el Servicio asumido por AdsME. */
  serviceAssumedBy: number;
  artistCount: number;
}

/** Artista del ranking del mes con su avance hacia la meta de shows. */
export interface NominaTopArtist extends NominaArtistSummary {
  monthIncome: number;
  progress: NominaShowProgress;
}

/** Resumen del módulo: KPIs, rendimiento, distribución y top del mes. */
export interface NominaOverview {
  /** Mes en curso en formato `AAAA-MM`. */
  month: string;
  kpis: NominaMonthKpis;
  distribution: NominaBucketAmount[];
  performance: NominaDailyPoint[];
  topArtists: NominaTopArtist[];
}
