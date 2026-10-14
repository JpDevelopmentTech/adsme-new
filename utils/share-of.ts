/** Parte de un total en porcentaje, o `null` si el total es cero. */
export function shareOf(part: number, whole: number): number | null {
  return whole > 0 ? (part / whole) * 100 : null;
}
