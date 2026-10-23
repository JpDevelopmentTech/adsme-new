import type { QuotePlatformFigures } from "@/domain/entities/quote-figures";
import type { CascadeSegment } from "@/types/quote-platforms.types";

/** Tramos de la barra servicio / comisión / pauta, en proporción a lo positivo de cada uno. */
export function quoteCascadeSegments(figures: QuotePlatformFigures): CascadeSegment[] {
  const parts = { service: Math.max(0, figures.service), fee: Math.max(0, figures.fee), pauta: Math.max(0, figures.pauta) };
  const sum = parts.service + parts.fee + parts.pauta;
  return (["service", "fee", "pauta"] as const).map((key) => ({ key, share: sum > 0 ? parts[key] / sum : 0 }));
}
