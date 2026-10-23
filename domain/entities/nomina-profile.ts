import type { NominaArtistConfig } from "@/domain/entities/nomina-artist-config";
import type { NominaArtistCampaign } from "@/domain/entities/nomina-campaign-spend";
import type { NominaArtistSummary, NominaScalability, NominaShowProgress } from "@/domain/entities/nomina-artist";
import type { NominaBucketAmount, NominaDailyPoint, NominaMonthSplit } from "@/domain/entities/nomina-bucket";
import type { NominaExpense } from "@/domain/entities/nomina-expense";
import type { NominaMovement, NominaMovementTotals } from "@/domain/entities/nomina-movement";
import type { NominaSocialLink } from "@/domain/entities/nomina-social";

/** Cifras del perfil: las del mes en curso y las acumuladas. */
export interface NominaProfileKpis {
  monthIncome: number;
  availableBudget: number;
  monthProfit: number;
  /** Gastos con destino Ads más el gasto en pesos de las campañas. */
  adsSpent: number;
  /** Parte de `adsSpent` que viene de las campañas de AdsME. */
  campaignSpent: number;
  monthService: number;
  monthTaxes: number;
  serviceAssumedByAdsme: boolean;
}

/** Rentabilidad neta acumulada del artista. */
export interface NominaProfitability {
  /** Margen en porcentaje, o `null` si todavía no tiene ingresos. */
  margin: number | null;
}

/** Fila del presupuesto mes a mes en el histórico. */
export interface NominaBudgetMonth extends NominaMonthSplit {
  shows: number;
  minShows: number;
  receivedBudget: number;
  leftBudget: number;
}

/** Perfil completo de un artista de la nómina. */
export interface NominaArtistProfile extends NominaArtistSummary {
  nomina: number;
  joinedAt: string;
  scalability: NominaScalability;
  socials: NominaSocialLink[];
  kpis: NominaProfileKpis;
  profitability: NominaProfitability;
  progress: NominaShowProgress;
  /** Meta de Utilidad fija del mes, si el artista la tiene. */
  fixedProfitGoal: number | null;
  movements: NominaMovement[];
  movementTotals: NominaMovementTotals;
  expenses: NominaExpense[];
  /** Campañas de AdsME desde que entró a Nómina. */
  campaigns: NominaArtistCampaign[];
  monthDistribution: NominaBucketAmount[];
  performance: NominaDailyPoint[];
  history: NominaBudgetMonth[];
  /** Inversión acumulada de todos los meses. */
  raisedInvestment: number;
  /** Configuración guardada, para precargar «Configuración». */
  config: NominaArtistConfig;
}
