/** Alto del área de la gráfica «Inversión por día», en px. */
export const SPEND_CHART_HEIGHT = 300;

/** Degradado de cada área: más opaco arriba, casi transparente en la base. */
export const SPEND_FILL_OPACITY = { from: 0.55, to: 0.25 };

/** Lo previsto: trazo discontinuo y relleno rebajado (`forecastDataPoints`). */
export const SPEND_FORECAST = { fillOpacity: 0.3, dashArray: 5, strokeWidth: 1.5 };

/**
 * Rótulos como mucho en el eje X. Los días se reparten a intervalos iguales
 * desde el primero, y el último del período se rotula siempre.
 */
export const SPEND_AXIS_LABELS = 7;

/** Colores del cromo de la gráfica sobre el vidrio. */
export const SPEND_CHART_COLORS = {
  grid: "#ffffff12",
  label: "#ffffff8f",
  today: "#c9b6ff",
  todayText: "#1a1030",
  forecastBand: "#ffffff",
} as const;

/** Opacidad de la franja que sombrea los días que faltan del período. */
export const SPEND_FORECAST_BAND_OPACITY = 0.03;
