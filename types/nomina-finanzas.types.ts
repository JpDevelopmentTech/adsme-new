import type { NominaBucketKey } from "@/domain/entities/nomina-bucket";
import type { NominaLedgerRow } from "@/domain/entities/nomina-finance";
import type { ProfitLevel } from "@/types/nomina-ui.types";

/** Pestañas de Finanzas, tal como van en `?pestana=`. */
export type FinanceTab = "resumen" | "flujo" | "rentabilidad" | "tributario" | "libro";

/** Cifras de un periodo con los impuestos y la utilidad neta ya derivados. */
export interface FinanceFigures {
  income: number;
  service: number;
  profit: number;
  taxes: number;
  netProfit: number;
  investment: number;
}

/** Tarjeta de cifra con su variación frente al periodo anterior. */
export interface FinanceKpi {
  label: string;
  value: string;
  /** Variación en porcentaje, o `null` si no hay con qué comparar. */
  delta: number | null;
  note?: string;
  valueClassName?: string;
}

/** Veredicto del negocio en el periodo. */
export interface BusinessHealth {
  margin: number | null;
  level: ProfitLevel;
  /** Utilidad neta ÷ ingresos brutos. */
  grossShare: number | null;
  profitableCount: number;
  artistCount: number;
}

/** Peso visual de una fila del estado de resultados. */
export type StatementTone = "plain" | "strong" | "net" | "margin";

export interface IncomeStatementRow {
  label: string;
  tone: StatementTone;
  /** Una celda por mes y la del total al final. */
  cells: string[];
}

export interface IncomeStatement {
  columns: string[];
  rows: IncomeStatementRow[];
}

/** Parte de cada $100 de ingresos que se lleva una bolsa. */
export interface PerHundredPart {
  key: NominaBucketKey;
  label: string;
  amount: number;
}

/** Fila de «Rentabilidad por artista», ya calculada. */
export interface ArtistProfitRow extends FinanceFigures {
  id: string;
  name: string;
  shows: number;
  margin: number | null;
  level: ProfitLevel;
  netPerShow: number | null;
  fixedGoalProgress: number | null;
}

/** Serie apilada de una gráfica por artista o por mes. */
export interface StackedSeries {
  name: string;
  color: string;
  data: number[];
}

/** Impuestos de un mes con el acumulado del periodo hasta él. */
export interface MonthlyTaxRow {
  month: string;
  base: number;
  tax: number;
  netProfit: number;
  cumulative: number;
}

export interface ArtistTaxRow {
  id: string;
  name: string;
  base: number;
  tax: number;
  /** Parte del impuesto total, en porcentaje. */
  share: number;
}

/** Movimiento del libro con su reparto completo y la foto del artista. */
export interface LedgerEntry extends NominaLedgerRow {
  taxes: number;
  netProfit: number;
  investment: number;
  photoUrl: string | null;
}

export type LedgerTotals = Omit<FinanceFigures, "income"> & { amount: number };
