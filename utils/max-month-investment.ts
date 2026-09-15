import type { ClientListing } from "@/domain/entities/client-listing";

/**
 * Inversión del cliente que más invierte este mes. Fija la escala común de las
 * barras del listado: sin una referencia compartida, cada barra solo hablaría
 * de sí misma y el listado dejaría de ser comparable.
 */
export function maxMonthInvestment(clients: ClientListing[]): number {
  return clients.reduce(
    (max, client) => Math.max(max, client.monthInvestment),
    0,
  );
}
