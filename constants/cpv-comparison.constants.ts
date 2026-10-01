/** Textos del panel «YouTube frente a lo presupuestado» del reporte. */
export const CPV_COMPARISON_COPY = {
  title: "YouTube frente a lo presupuestado",
  subtitle: (period: string) => `Vistas acumuladas · ${period}`,
  above: (percent: string, isFinished: boolean) =>
    isFinished
      ? `YouTube entregó ${percent} más vistas de las presupuestadas`
      : `YouTube va ${percent} por encima de las vistas presupuestadas`,
  below: (percent: string, isFinished: boolean) =>
    isFinished
      ? `YouTube entregó ${percent} menos vistas de las presupuestadas`
      : `YouTube va ${percent} por debajo de las vistas presupuestadas`,
  even: "YouTube va al ritmo exacto de lo presupuestado",
  plannedLabel: "Vistas presupuestadas",
  plannedNote: (budget: string, cpv: string) => `${budget} a ${cpv} por vista`,
  plannedRate: (cpv: string) => `A ${cpv} por vista`,
  actualLabel: "Vistas generadas",
  actualNote: (isFinished: boolean) =>
    isFinished ? "En todo el período" : "Hasta hoy",
  effectiveLabel: "CPV efectivo",
  effectiveNote: (cpv: string) => `Frente a ${cpv} cobrado`,
  plannedSeries: "Presupuestadas",
  actualSeries: "Generadas",
  chartLabel: (planned: string, actual: string) =>
    `Vistas acumuladas en YouTube: ${actual} generadas frente a ${planned} presupuestadas.`,
} as const;

/** Alto del área de dibujo, igual que la gráfica de crecimiento. */
export const CPV_CHART_HEIGHT = 280;

/**
 * Colores literales: ApexCharts no entiende `var(--token)`. Lo presupuestado va
 * en blanco translúcido y a trazos, como una meta; lo generado, en el rojo de YouTube.
 */
export const CPV_CHART_COLORS = {
  planned: "#ffffff8c",
  actual: "#ff5a5f",
} as const;

/** Trazo discontinuo de la línea presupuestada; la real va continua. */
export const CPV_CHART_DASH = [5, 0];

/** Grosor de cada serie, en el mismo orden. */
export const CPV_CHART_STROKE = [1.5, 2.8];
