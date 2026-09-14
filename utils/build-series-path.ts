/** Trazado de la línea y del área bajo ella, en el sistema de la caja dada. */
export interface SeriesPath {
  line: string;
  area: string;
  /** Último punto, donde se posa el marcador del final de la serie. */
  end: { x: number; y: number };
}

/**
 * Convierte una serie en trazados SVG dentro de una caja de `width` × `height`.
 * La escala parte de cero para que la altura de la curva sea comparable entre
 * plataformas; escalar al mínimo de cada serie exageraría variaciones pequeñas.
 */
export function buildSeriesPath(
  points: number[],
  width: number,
  height: number,
): SeriesPath | null {
  if (points.length < 2) return null;

  const max = Math.max(...points, 1);
  const step = width / (points.length - 1);
  const coords = points.map((value, index) => ({
    x: index * step,
    y: height - (value / max) * height,
  }));

  const line = coords
    .map((point, index) => `${index === 0 ? "M" : "L"}${round(point.x)} ${round(point.y)}`)
    .join(" ");

  return {
    line,
    area: `${line} L${round(width)} ${height} L0 ${height} Z`,
    end: coords[coords.length - 1],
  };
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
