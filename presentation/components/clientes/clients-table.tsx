import { CLIENTS_COPY, CLIENTS_TABLE_COLUMNS } from "@/constants/clients.constants";
import { ClientRow } from "@/presentation/components/clientes/client-row";
import { ClientsNoResults } from "@/presentation/components/clientes/clients-no-results";
import { ClientsToolbar } from "@/presentation/components/clientes/clients-toolbar";
import type { ClientsTableProps } from "@/types/client.types";

/**
 * La cartera como lista comparable, en vidrio grueso. Los filtros van dentro
 * del panel, como primera fila: filtran esta tabla y no la página.
 */
export function ClientsTable({
  clients,
  maxInvestment,
  nowIso,
  query,
  isFiltered,
}: ClientsTableProps) {
  const resultsLabel = isFiltered
    ? CLIENTS_COPY.results(clients.length)
    : CLIENTS_COPY.count(clients.length);

  return (
    <section className="glass-thick flex flex-col rounded-card px-6 pt-5 pb-2.5">
      <ClientsToolbar query={query} resultsLabel={resultsLabel} />

      <div className="hidden h-9 items-center gap-4 border-b border-border text-xs font-normal text-text-muted lg:flex">
        <span className="min-w-0 flex-1">{CLIENTS_TABLE_COLUMNS.client}</span>
        <span className="w-[300px] shrink-0">{CLIENTS_TABLE_COLUMNS.investment}</span>
        <span className="w-[190px] shrink-0">{CLIENTS_TABLE_COLUMNS.jobs}</span>
        <span className="w-[130px] shrink-0">{CLIENTS_TABLE_COLUMNS.status}</span>
        <span className="w-10 shrink-0" />
      </div>

      {clients.length === 0 ? (
        <ClientsNoResults />
      ) : (
        <ul>
          {clients.map((client) => (
            <ClientRow
              key={client.id}
              client={client}
              maxInvestment={maxInvestment}
              nowIso={nowIso}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
