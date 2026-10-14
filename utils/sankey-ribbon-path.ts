/** Redondea a una décima para que el `d` del SVG no se alargue sin necesidad. */
function round(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Cinta del Sankey entre dos nodos: dos curvas de Bézier paralelas, de grosor
 * `thickness`, que salen del borde derecho del origen y entran por la izquierda.
 */
export function sankeyRibbonPath(x0: number, y0: number, x1: number, y1: number, thickness: number): string {
  const mid = round((x0 + x1) / 2);
  const [a, b, c, d] = [x0, y0, x1, y1].map(round);
  const t = round(thickness);

  return `M${a},${b}C${mid},${b} ${mid},${d} ${c},${d}L${c},${round(d + t)}C${mid},${round(d + t)} ${mid},${round(b + t)} ${a},${round(b + t)}Z`;
}
