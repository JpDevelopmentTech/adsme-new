import type { Metadata } from "next";
import { isFilteredQuery } from "@/domain/entities/client-query";
import { createListClients } from "@/domain/use-cases/list-clients";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ClientsEmptyState } from "@/presentation/components/clientes/clients-empty-state";
import { ClientsPortfolioBand } from "@/presentation/components/clientes/clients-portfolio-band";
import { ClientsTable } from "@/presentation/components/clientes/clients-table";
import { buildPortfolioSummary } from "@/utils/build-portfolio-summary";
import { formatMonthName } from "@/utils/format-month-name";
import { maxMonthInvestment } from "@/utils/max-month-investment";
import { parseClientListQuery } from "@/utils/parse-client-list-query";

export const metadata: Metadata = { title: "Clientes · adsme" };

/**
 * Pantalla `B2 · Clientes`: la cartera vista por dinero. Las filas comparten
 * una escala común, así que el orden de quién se lleva el presupuesto se lee
 * sin comparar cifras una a una.
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

  // Sin filtros y sin resultados significa que el usuario todavía no tiene clientes.
  if (clients.length === 0 && !isFiltered) return <ClientsEmptyState />;

  return (
    <>
      <ClientsPortfolioBand
        summary={buildPortfolioSummary(clients)}
        clients={clients}
        monthName={formatMonthName(now)}
      />

      <ClientsTable
        clients={clients}
        maxInvestment={maxMonthInvestment(clients)}
        nowIso={now.toISOString()}
        query={query}
        isFiltered={isFiltered}
      />
    </>
  );
}
