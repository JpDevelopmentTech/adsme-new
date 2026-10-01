import { notFound } from "next/navigation";
import { CLIENT_STATUS_BADGE } from "@/constants/clients.constants";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ClientForm } from "@/presentation/components/clientes/client-form";
import { toClientFormValues } from "@/utils/to-client-form-values";

/**
 * Formulario de edición de un cliente, compartido por la página y por el modal
 * interceptado. Responde 404 si el cliente no existe o no es del usuario.
 */
export async function EditClientScreen({ clientId, isModal }: { clientId: string; isModal: boolean }) {
  const repository = createSupabaseClientRepository(await createServerSupabaseClient());
  const client = await createGetClient(repository)(clientId);

  if (!client) notFound();

  return (
    <ClientForm
      isModal={isModal}
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
