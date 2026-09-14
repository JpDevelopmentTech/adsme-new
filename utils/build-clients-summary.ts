import { CLIENTS_SUMMARY_COPY } from "@/constants/clients.constants";
import type { ClientListing } from "@/domain/entities/client-listing";
import type { StatStripItem } from "@/types/ui.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatMonthName } from "@/utils/format-month-name";

/**
 * Cifras de cabecera del listado. Se calculan sobre los clientes que se están
 * mostrando, así que con filtros aplicados describen el resultado, no la cartera.
 */
export function buildClientsSummary(
  clients: ClientListing[],
  now: Date,
  isFiltered = false,
): StatStripItem[] {
  const sum = (pick: (client: ClientListing) => number) =>
    clients.reduce((total, client) => total + pick(client), 0);

  return [
    {
      value: String(clients.length),
      label: isFiltered
        ? CLIENTS_SUMMARY_COPY.results
        : CLIENTS_SUMMARY_COPY.clients,
    },
    {
      value: String(clients.filter((client) => client.status === "active").length),
      label: CLIENTS_SUMMARY_COPY.withActiveJobs,
    },
    {
      value: String(sum((client) => client.activeCampaigns)),
      label: CLIENTS_SUMMARY_COPY.liveCampaigns,
    },
    {
      value: formatCompactCurrency(sum((client) => client.monthInvestment)),
      label: CLIENTS_SUMMARY_COPY.monthInvestment(formatMonthName(now)),
    },
  ];
}
