import { SUGGESTED_SERVICE_RATIO } from "@/constants/nomina-modales.constants";

/** Servicio sugerido: 2/7 del punto de equilibrio, redondeado al peso. */
export function suggestService(nomina: number, minShows: number): number {
  return Math.round(nomina * minShows * SUGGESTED_SERVICE_RATIO);
}
