import type { ClientListing } from "@/domain/entities/client-listing";
import type { PortfolioSummary } from "@/types/client.types";

/**
 * Cifras de la banda que encabeza `B2`. Se calculan sobre los clientes que se
 * están mostrando, así que con filtros aplicados describen el resultado y no la
 * cartera entera.
 */
export function buildPortfolioSummary(
  clients: ClientListing[],
): PortfolioSummary {
  const countBy = (status: ClientListing["status"]) =>
    clients.filter((client) => client.status === status).length;

  return {
    total: clients.reduce((sum, client) => sum + client.monthInvestment, 0),
    clientsCount: clients.length,
    working: countBy("active"),
    paused: countBy("paused"),
    empty: countBy("empty"),
    liveCampaigns: clients.reduce(
      (sum, client) => sum + client.activeCampaigns,
      0,
    ),
  };
}
