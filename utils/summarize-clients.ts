import type { Client } from "@/domain/entities/client";

/**
 * Subtítulo del listado. Sin filtros describe la cartera completa; con filtros
 * aplicados describe cuántos resultados quedaron.
 */
export function summarizeClients(clients: Client[], isFiltered = false): string {
  const clientsLabel = clients.length === 1 ? "cliente" : "clientes";

  if (isFiltered) {
    const resultsLabel = clients.length === 1 ? "resultado" : "resultados";
    return `${clients.length} ${resultsLabel}`;
  }

  const withActiveJobs = clients.filter(
    (client) => client.activeJobsCount > 0,
  ).length;

  return `${clients.length} ${clientsLabel} · ${withActiveJobs} con trabajos activos`;
}
