import type { NominaPeriodPreset } from "@/domain/entities/nomina-period";

/** Parámetro de la URL que elige el periodo de Finanzas. */
export const FINANCE_PERIOD_PARAM = "periodo";

/** Atajos del selector de periodo de Finanzas e Histórico, en orden. */
export const PERIOD_PRESETS: { preset: NominaPeriodPreset; label: string }[] = [
  { preset: "mes", label: "Mes en curso" },
  { preset: "pasado", label: "Mes pasado" },
  { preset: "3m", label: "Últimos 3 meses" },
  { preset: "6m", label: "Últimos 6 meses" },
  { preset: "12m", label: "Últimos 12 meses" },
  { preset: "todo", label: "Todo" },
];

export const PERIOD_QUARTERS = [1, 2, 3, 4] as const;

export const PERIOD_MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] as const;

/** Periodo del Histórico del perfil, que todavía no filtra: últimos 6 meses (mayo–octubre). */
export const DEFAULT_PERIOD = { label: "Últimos 6 meses", range: "May 26 – Oct 26", year: 2026, from: "2026-05", to: "2026-10" } as const;

/** Textos del selector de periodo. */
export const PERIOD_COPY = {
  shortcutsTitle: "Atajos",
  help: "Haz clic en un mes de inicio y otro de fin para elegir tu propio rango.",
  anchorHelp: (month: string) => `Desde ${month} — elige el mes final.`,
  previousYear: "Año anterior",
  nextYear: "Año siguiente",
  year: (year: number) => `Año ${year}`,
  quarter: (quarter: number, year: number) => `Q${quarter} ${year}`,
  dialogLabel: "Elegir periodo",
} as const;
