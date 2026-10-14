/**
 * Tope «redondo» de un eje para que sus `ticks` divisiones caigan en cifras
 * limpias: 8,3M en 3 divisiones da 9M; 359K en 2 da 400K.
 */
export function niceAxisMax(value: number, ticks: number): number {
  if (value <= 0) return ticks;
  const raw = value / ticks;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  return Math.ceil(raw / magnitude) * magnitude * ticks;
}
