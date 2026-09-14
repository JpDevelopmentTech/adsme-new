import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CLIENT_STATUS_BADGE } from "@/constants/clients.constants";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ClientForm } from "@/presentation/components/clientes/client-form";
import { toClientFormValues } from "@/utils/to-client-form-values";

export const metadata: Metadata = { title: "Editar cliente · adsme" };

export default async function EditarClientePage({
  params,
}: PageProps<"/clientes/[id]/editar">) {
  const { id } = await params;
  const repository = createSupabaseClientRepository(
    await createServerSupabaseClient(),
  );
  const client = await createGetClient(repository)(id);

  if (!client) notFound();

  return (
    <ClientForm
      clientId={client.id}
      title={CLIENT_FORM_COPY.editTitle}
      initialValues={toClientFormValues(client)}
      initialAvatarUrl={client.avatarUrl ?? null}
      previewMeta={{
        gradient: client.gradient,
        jobsCount: client.jobsCount,
        activeJobsCount: client.activeJobsCount,
        status: CLIENT_STATUS_BADGE[client.status],
      }}
    />
  );
}
