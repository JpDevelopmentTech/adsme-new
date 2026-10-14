import type { NominaExpense } from "@/domain/entities/nomina-expense";
import type { NominaSocialLink } from "@/domain/entities/nomina-social";

/** Ingreso puntual que no es un show (por ejemplo una Inversión Única). */
export interface SampleExtraIncome {
  month: string;
  day: number;
  amount: number;
  serviceCost: number;
}

/** Definición de un artista de muestra a partir de la que se generan sus cifras. */
export interface SampleArtistSpec {
  id: string;
  name: string;
  photoUrl: string;
  nomina: number;
  minShows: number;
  service: number;
  profitPercent: number;
  profitPerShowAfterMin: number;
  /** `true` si AdsME asume el Servicio en lugar del cliente. */
  adsmeAssumesService: boolean;
  /** Shows por mes, en el orden de `SAMPLE_MONTHS`. */
  showsByMonth: number[];
  extraIncomes: SampleExtraIncome[];
  /** Inversión de Shows del mes anterior al primero de muestra. */
  previousInvestment: number;
  joinedAt: string;
  fixedProfitGoal: number | null;
  socials: NominaSocialLink[];
  expenses: NominaExpense[];
}

/** Reparto calculado de un show. */
export interface SampleShowSplit {
  service: number;
  profit: number;
  investment: number;
}
