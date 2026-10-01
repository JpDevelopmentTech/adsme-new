/**
 * Fecha del último punto con dato cuando después vienen días sin llegar: ahí
 * va la marca de hoy. Si la serie no tiene huecos al final, el período ya pasó
 * y no hay hoy que marcar.
 */
export function findTodayCategory(points: { x: string; y: number | null }[]): string | null {
  const lastIndex = points.findLastIndex((point) => point.y !== null);

  if (lastIndex === -1 || lastIndex === points.length - 1) return null;

  return points[lastIndex].x;
}
