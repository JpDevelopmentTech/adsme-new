/** Alto del área de dibujo, en píxeles. Fijo para que no haya salto de layout. */
export const GROWTH_CHART_HEIGHT = 220;

/** Opacidad del degradado: baja, para que dos áreas superpuestas se lean. */
export const GROWTH_FILL_OPACITY = { from: 0.34, to: 0.02 };

/** Cuántas marcas como mucho lleva el eje de fechas antes de amontonarse. */
export const GROWTH_X_TICKS = 6;

/** Grosor del trazo de cada plataforma. */
export const GROWTH_STROKE_WIDTH = 2;

/**
 * ApexCharts calcula en JavaScript, así que no entiende `var(--token)`: los
 * colores del eje y la rejilla van en el valor literal del sistema.
 */
export const GROWTH_CHART_COLORS = {
  grid: "#c8d1da",
  label: "#5a6580",
} as const;

/** Tamaño de los rótulos de ambos ejes. */
export const GROWTH_LABEL_SIZE = "10.5px";
