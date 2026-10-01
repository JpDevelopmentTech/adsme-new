/** Alto del área de dibujo, en píxeles. Fijo para que no haya salto de layout. */
export const GROWTH_CHART_HEIGHT = 280;

/** Opacidad del degradado: baja, para que dos áreas superpuestas se lean. */
export const GROWTH_FILL_OPACITY = { from: 0.4, to: 0.02 };

/** Cuántas marcas como mucho lleva el eje de fechas antes de amontonarse. */
export const GROWTH_X_TICKS = 5;

/** Grosor del trazo de cada plataforma. */
export const GROWTH_STROKE_WIDTH = 2;

/**
 * Interpolación de las curvas. `monotoneCubic` suaviza como el diseño pero sin
 * pasarse de los valores reales entre dos días: no dibuja picos ni valles que
 * la serie no tiene, que era la razón de haber usado trazo recto.
 */
export const GROWTH_CURVE = "monotoneCubic" as const;

/**
 * ApexCharts calcula en JavaScript, así que no entiende `var(--token)`: los
 * colores del eje, la rejilla y la marca de hoy van en el valor literal.
 */
export const GROWTH_CHART_COLORS = {
  grid: "#ffffff12",
  label: "#ffffff8f",
  today: "#c9b6ff80",
} as const;

/** Tamaño de los rótulos de ambos ejes. */
export const GROWTH_LABEL_SIZE = "11px";
