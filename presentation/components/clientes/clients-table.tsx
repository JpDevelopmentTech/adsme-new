import { CLIENTS_COPY, CLIENTS_TABLE_COLUMNS } from "@/constants/clients.constants";
import { ClientRow } from "@/presentation/components/clientes/client-row";
import { ClientsNoResults } from "@/presentation/components/clientes/clients-no-results";
import { ClientsToolbar } from "@/presentation/components/clientes/clients-toolbar";
import type { ClientsTableProps } from "@/types/client.types";

/**
 * La cartera como lista comparable. Los filtros van dentro del panel, como
 * primera fila: filtran esta tabla y no la página, y ahí es donde se entiende.
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
    <section className="glass-panel flex flex-col overflow-hidden rounded-card">
      <ClientsToolbar query={query} resultsLabel={resultsLabel} />

      <div className="h-px bg-border/60" />

      <div className="hidden items-center gap-3.5 bg-g-100 px-5 py-[9px] text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase lg:flex">
        <span className="w-[264px] shrink-0">{CLIENTS_TABLE_COLUMNS.client}</span>
        <span className="min-w-0 flex-1">{CLIENTS_TABLE_COLUMNS.investment}</span>
        <span className="w-[100px] shrink-0" />
        <span className="w-[140px] shrink-0">{CLIENTS_TABLE_COLUMNS.jobs}</span>
        <span className="w-24 shrink-0 text-center">
          {CLIENTS_TABLE_COLUMNS.status}
        </span>
        <span className="w-[34px] shrink-0" />
      </div>

      {clients.length === 0 ? (
        <ClientsNoResults />
      ) : (
        <ul className="border-t border-border/60">
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
