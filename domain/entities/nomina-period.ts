/** Atajos del selector de periodo de Finanzas. */
export type NominaPeriodPreset = "mes" | "pasado" | "3m" | "6m" | "12m" | "todo";

/** Periodo elegido en Finanzas: un atajo, un trimestre, un año o un rango de meses. */
export type NominaPeriodSelection =
  | { kind: "preset"; preset: NominaPeriodPreset }
  | { kind: "quarter"; year: number; quarter: 1 | 2 | 3 | 4 }
  | { kind: "year"; year: number }
  | { kind: "range"; from: string; to: string };

/** Periodo resuelto en meses `AAAA-MM`; `compare` indica si hay periodo anterior. */
export interface NominaPeriodRange {
  from: string;
  to: string;
  compare: boolean;
}
