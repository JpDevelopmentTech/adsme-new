/** Parte de `value` sobre `base` en %; 0 si la base no es positiva. */
export function quoteSharePct(value: number, base: number): number {
  return base > 0 ? (value / base) * 100 : 0;
}
