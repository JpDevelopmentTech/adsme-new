import type { QuoteTarget } from "@/domain/entities/quote";

/** Lugares de un segmento: sus zonas si las hay; si no, sus países o regiones. */
export function describeTargetPlaces(target: QuoteTarget, placeName: (code: string) => string): string {
  if (target.zones.length) return target.zones.join(", ");
  return target.places.map(placeName).join(", ");
}

/** Rango de edades: «18 a 50 años», «Desde 18 años» o «Hasta 50 años». */
export function describeAges(from: string, to: string): string {
  if (from && to) return `${from} a ${to} años`;
  if (from) return `Desde ${from} años`;
  if (to) return `Hasta ${to} años`;
  return "";
}
