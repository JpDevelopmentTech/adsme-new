/** Impuestos: 30 % de la Utilidad, según las reglas del modelo. */
export const NOMINA_TAX_RATE = 0.3;

/** Umbrales de rentabilidad neta en porcentaje. */
export const PROFIT_THRESHOLDS = { low: 5, healthy: 10, excellent: 20 } as const;

/** Escala de la barra de rentabilidad: de 0 a 30 % o más. */
export const PROFIT_BAR_MAX = 30;

/** Cromo de las gráficas de la nómina sobre el vidrio. */
export const NOMINA_CHART_CHROME = {
  grid: "#ffffff12",
  label: "#ffffff8f",
  line: "#ffffff",
} as const;
