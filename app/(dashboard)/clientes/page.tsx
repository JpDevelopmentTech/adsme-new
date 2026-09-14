import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { CLIENTS_COPY } from "@/constants/clients.constants";
import { NEW_CLIENT_ROUTE } from "@/constants/routes.constants";
import { isFilteredQuery } from "@/domain/entities/client-query";
import { createListClients } from "@/domain/use-cases/list-clients";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ClientsEmptyState } from "@/presentation/components/clientes/clients-empty-state";
import { ClientsGrid } from "@/presentation/components/clientes/clients-grid";
import { ClientsNoResults } from "@/presentation/components/clientes/clients-no-results";
import { ClientsToolbar } from "@/presentation/components/clientes/clients-toolbar";
import { PageHeader } from "@/presentation/components/dashboard/page-header";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { StatStrip } from "@/presentation/components/ui/stat-strip";
import { buildClientsSummary } from "@/utils/build-clients-summary";
import { formatMonthName } from "@/utils/format-month-name";
import { parseClientListQuery } from "@/utils/parse-client-list-query";
import { summarizeClients } from "@/utils/summarize-clients";

export const metadata: Metadata = { title: "Clientes · adsme" };

/**
 * Pantalla `B2 · Clientes`: la cartera vista por dinero: qué se invierte este
 * mes en cada uno, cómo se reparte entre plataformas y cuál lleva días quieto.
 */
export default async function ClientesPage({
  searchParams,
}: PageProps<"/clientes">) {
  const query = parseClientListQuery(await searchParams);
  const now = new Date();
  const repository = createSupabaseClientRepository(
    await createServerSupabaseClient(),
  );
  const clients = await createListClients(repository)(query, now);
  const isFiltered = isFilteredQuery(query);

  const newClientLink = (
    <PrimaryLink href={NEW_CLIENT_ROUTE}>
      <Plus size={18} strokeWidth={2} aria-hidden />
      {CLIENTS_COPY.newClient}
    </PrimaryLink>
  );

  // Sin filtros y sin resultados significa que el usuario todavía no tiene clientes.
  if (clients.length === 0 && !isFiltered) {
    return (
      <>
        <PageHeader
          title={CLIENTS_COPY.title}
          subtitle={summarizeClients(clients)}
          actions={newClientLink}
        />
        <ClientsEmptyState />
      </>
    );
  }

  return (
    <>
      <PageHeader title={CLIENTS_COPY.title} actions={newClientLink} />

      <StatStrip items={buildClientsSummary(clients, now, isFiltered)} />

      <ClientsToolbar query={query} />

      {clients.length === 0 ? (
        <ClientsNoResults />
      ) : (
        <ClientsGrid
          clients={clients}
          monthName={formatMonthName(now)}
          nowIso={now.toISOString()}
        />
      )}
    </>
  );
}
