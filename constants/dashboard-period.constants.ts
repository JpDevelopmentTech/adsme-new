/**
 * Días como mucho que abarca un período. Un año entero cabe en la gráfica
 * diaria sin que los días dejen de distinguirse, y acota la lectura de la serie.
 */
export const MAX_DASHBOARD_PERIOD_DAYS = 366;

/** Períodos rápidos, en el orden en que se ofrecen. */
export const DASHBOARD_PERIOD_PRESETS = [
  { key: "this-month", label: "Este mes" },
  { key: "last-month", label: "Mes pasado" },
  { key: "last-30", label: "Últimos 30 días" },
  { key: "last-90", label: "Últimos 90 días" },
] as const;

/** Textos propios del filtro de período del dashboard; los del formulario son comunes. */
export const DASHBOARD_PERIOD_COPY = {
  presets: "Períodos rápidos",
  invalidLink: (reason: string) => `${reason} Se muestra el mes en curso.`,
} as const;
