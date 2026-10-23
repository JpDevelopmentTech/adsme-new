import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createGetClientOverview } from "@/domain/use-cases/get-client-overview";
import { createGetNominaEnrollment } from "@/domain/use-cases/get-nomina-enrollment";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseNominaEnrollmentRepository } from "@/infrastructure/repositories/supabase-nomina-enrollment-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ClientBreadcrumb } from "@/presentation/components/cliente-detalle/client-breadcrumb";
import { ClientHero } from "@/presentation/components/cliente-detalle/client-hero";
import { ClientJobsPanel } from "@/presentation/components/cliente-detalle/client-jobs-panel";
import { ClientMetrics } from "@/presentation/components/cliente-detalle/client-metrics";
import { ClientNominaCard } from "@/presentation/components/cliente-detalle/client-nomina-card";
import { AmbientGlow } from "@/presentation/components/ui/ambient-glow";

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

/** Inscripción del cliente en Nómina, o `null` si no está inscrito. */
async function getNominaEnrollment(clientId: string) {
  return createGetNominaEnrollment(createSupabaseNominaEnrollmentRepository(await createServerSupabaseClient()))(clientId);
}

/** Pantalla `B3 · Cliente Detalle`: ficha del cliente, su relación con Nómina y sus trabajos. */
export default async function ClienteDetallePage({
  params,
}: PageProps<"/clientes/[id]">) {
  const { id } = await params;
  const [overview, enrollment] = await Promise.all([getClientOverview(id), getNominaEnrollment(id)]);

  if (!overview) notFound();

  return (
    <>
      <AmbientGlow imageUrl={overview.client.avatarUrl} />
      <ClientBreadcrumb clientName={overview.client.name} />
      <ClientHero client={overview.client} />
      <ClientMetrics metrics={overview.client.metrics} />
      <ClientNominaCard client={overview.client} enrollment={enrollment} />
      <ClientJobsPanel jobs={overview.jobs} />
    </>
  );
}
