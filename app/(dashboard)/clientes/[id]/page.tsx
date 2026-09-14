import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createGetClientOverview } from "@/domain/use-cases/get-client-overview";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ClientBreadcrumb } from "@/presentation/components/cliente-detalle/client-breadcrumb";
import { ClientHero } from "@/presentation/components/cliente-detalle/client-hero";
import { ClientJobsPanel } from "@/presentation/components/cliente-detalle/client-jobs-panel";
import { ClientMetrics } from "@/presentation/components/cliente-detalle/client-metrics";

/** Compone el caso de uso con los repositorios reales de clientes y trabajos. */
async function getClientOverview(clientId: string) {
  const supabase = await createServerSupabaseClient();

  return createGetClientOverview(
    createSupabaseClientRepository(supabase),
    createSupabaseJobRepository(supabase),
  )(clientId);
}

export async function generateMetadata({
  params,
}: PageProps<"/clientes/[id]">): Promise<Metadata> {
  const { id } = await params;
  const overview = await getClientOverview(id);

  return {
    title: overview ? `${overview.client.name} · adsme` : "Cliente · adsme",
  };
}

/** Pantalla `B3 · Cliente Detalle`: ficha del cliente y sus trabajos. */
export default async function ClienteDetallePage({
  params,
}: PageProps<"/clientes/[id]">) {
  const { id } = await params;
  const overview = await getClientOverview(id);

  if (!overview) notFound();

  return (
    <>
      <ClientBreadcrumb clientName={overview.client.name} />
      <ClientHero client={overview.client} />
      <ClientMetrics metrics={overview.client.metrics} />
      <ClientJobsPanel jobs={overview.jobs} />
    </>
  );
}
