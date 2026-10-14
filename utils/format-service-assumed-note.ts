import { SERVICE_ASSUMED_COPY } from "@/constants/nomina-resumen-copy.constants";

/**
 * Nota de cuántos artistas tienen el Servicio asumido por AdsME. Sin ninguno
 * no hay nota; con todos, la forma corta.
 */
export function formatServiceAssumedNote(assumed: number, total: number): string | undefined {
  if (assumed === 0 || total === 0) return undefined;
  return assumed >= total ? SERVICE_ASSUMED_COPY.all : SERVICE_ASSUMED_COPY.some(assumed, total);
}
