/** Primer show (desde 1) cuyo acumulado supera o iguala la meta, o `null` si no llega. */
export function findShowReaching(cumulative: number[], target: number, isStrict = false): number | null {
  const index = cumulative.findIndex((value) => (isStrict ? value > target : value >= target));
  return index === -1 ? null : index + 1;
}
