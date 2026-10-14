/** Atajos del selector de periodo de Finanzas e Histórico. */
export const PERIOD_SHORTCUTS = [
  "Mes en curso",
  "Mes pasado",
  "Últimos 3 meses",
  "Últimos 6 meses",
  "Últimos 12 meses",
  "Todo",
] as const;

export const PERIOD_QUARTERS = ["Q1", "Q2", "Q3", "Q4"] as const;

export const PERIOD_MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] as const;

/** Periodo por defecto: últimos 6 meses hasta el mes en curso (mayo–octubre). */
export const DEFAULT_PERIOD = { label: "Últimos 6 meses", range: "May 26 – Oct 26", year: 2026, fromIndex: 4, toIndex: 9 } as const;

export const PERIOD_HELP = "Haz clic en un mes de inicio y otro de fin para elegir tu propio rango.";
