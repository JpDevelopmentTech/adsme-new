/** Meses con datos de muestra, del más antiguo al mes en curso. */
export const SAMPLE_MONTHS = ["2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10"] as const;

/** Mes en curso y día de hoy de los datos de muestra (14 de octubre de 2026). */
export const SAMPLE_CURRENT_MONTH = "2026-10";
export const SAMPLE_TODAY = 14;

/** Totales del periodo anterior (noviembre 2025 – abril 2026) para las variaciones. */
export const SAMPLE_PREVIOUS_TOTALS = {
  income: 36_800_000,
  service: 12_400_000,
  profit: 4_300_000,
  investment: 20_100_000,
} as const;

/** Calendario de los datos de muestra del diseño. */
export const SAMPLE_CALENDAR = {
  months: [...SAMPLE_MONTHS],
  currentMonth: SAMPLE_CURRENT_MONTH,
  today: SAMPLE_TODAY,
  daysInCurrentMonth: 31,
  previousTotals: { ...SAMPLE_PREVIOUS_TOTALS },
};

/** Tasa de impuestos sobre la Utilidad que aplica el modelo. */
export const SAMPLE_TAX_RATE = 0.3;
