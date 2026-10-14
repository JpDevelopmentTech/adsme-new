import type { NominaArtistSummary } from "@/domain/entities/nomina-artist";
import type { NominaMonthSplit } from "@/domain/entities/nomina-bucket";
import type { NominaIncomeConcept } from "@/domain/entities/nomina-movement";

/** Sumas de un periodo, sin los impuestos: se derivan siempre de la Utilidad. */
export interface NominaPeriodTotals {
  income: number;
  service: number;
  profit: number;
  investment: number;
}

/** Cifras de un artista dentro del periodo elegido. */
export interface NominaArtistFinance extends NominaArtistSummary, NominaPeriodTotals {
  shows: number;
  /** Avance de la meta de Utilidad fija del mes en curso, o `null` si no la tiene. */
  fixedGoalProgress: number | null;
}

/** Ingresos del periodo agrupados por concepto, para el origen del flujo de caja. */
export interface NominaConceptIncome {
  concept: NominaIncomeConcept;
  amount: number;
}

/** Movimiento del libro contable con el artista al que pertenece. */
export interface NominaLedgerRow {
  id: string;
  incomeDate: string;
  eventDate: string;
  assignedMonth: string;
  artistId: string;
  artistName: string;
  conceptLabel: string;
  amount: number;
  service: number;
  profit: number;
}

/** Finanzas del roster en un periodo. */
export interface NominaFinance {
  /** Primer y último mes del periodo, en formato `AAAA-MM`. */
  fromMonth: string;
  toMonth: string;
  totals: NominaPeriodTotals;
  /** Mismo número de meses inmediatamente anteriores, o `null` si no aplica. */
  previousTotals: NominaPeriodTotals | null;
  months: NominaMonthSplit[];
  artists: NominaArtistFinance[];
  incomeByConcept: NominaConceptIncome[];
  /** Gasto en Ads acumulado de todos los artistas. */
  consumedAds: number;
  /** Ingresos del mes en curso y día de hoy, para proyectar el cierre. */
  currentMonthIncome: number;
  currentDay: number;
  daysInCurrentMonth: number;
  /** Servicio asumido por AdsME: cuántos artistas de cuántos. */
  serviceAssumedBy: number;
  artistCount: number;
  ledgerCount: number;
  ledger: NominaLedgerRow[];
}
