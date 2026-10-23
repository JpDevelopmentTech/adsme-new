import type { NominaArtistConfig } from "@/domain/entities/nomina-artist-config";
import type { NominaPeriodTotals } from "@/domain/entities/nomina-finance";
import type { NominaExpense } from "@/domain/entities/nomina-expense";
import type { NominaArtistCampaign } from "@/domain/entities/nomina-campaign-spend";
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
  photoUrl: string | null;
  nomina: number;
  minShows: number;
  service: number;
  profitPercent: number;
  profitPerShowAfterMin: number;
  /** `true` si AdsME asume el Servicio en lugar del cliente. */
  adsmeAssumesService: boolean;
  /** Shows por mes, en el orden de `calendar.months`. */
  showsByMonth: number[];
  extraIncomes: SampleExtraIncome[];
  /** Inversión de Shows del mes anterior al primero de muestra. */
  previousInvestment: number;
  joinedAt: string;
  fixedProfitGoal: number | null;
  socials: NominaSocialLink[];
  expenses: NominaExpense[];
  /** Campañas de AdsME del artista con su gasto desde que entró a Nómina. */
  campaigns?: NominaArtistCampaign[];
  /** Configuración real guardada; sin ella se deriva de los campos del modelo. */
  config?: NominaArtistConfig;
}

/** Calendario con el que se arman las cifras: meses del periodo y el día de hoy. */
export interface NominaCalendar {
  /** Meses `AAAA-MM` del más antiguo al mes en curso. */
  months: string[];
  currentMonth: string;
  today: number;
  daysInCurrentMonth: number;
  /** Totales del periodo anterior, o `null` si no hay datos con qué comparar. */
  previousTotals: NominaPeriodTotals | null;
}

/** Reparto calculado de un show. */
export interface SampleShowSplit {
  service: number;
  profit: number;
  investment: number;
}
