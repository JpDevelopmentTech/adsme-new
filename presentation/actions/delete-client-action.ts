"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CLIENT_FORM_FIELDS } from "@/constants/client-messages.constants";
import { CLIENTS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { CLIENT_AVATARS_BUCKET } from "@/constants/storage.constants";
import { createDeleteClient } from "@/domain/use-cases/delete-client";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { removeFromBucket } from "@/infrastructure/storage/bucket-storage";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Server Action que elimina un cliente y su foto asociada.
 * La pertenencia la verifica RLS: sin ella el borrado no afecta a ninguna fila.
 */
export async function deleteClientAction(formData: FormData): Promise<void> {
  const clientId = formData.get(CLIENT_FORM_FIELDS.clientId);
  if (typeof clientId !== "string" || !clientId) return;

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const repository = createSupabaseClientRepository(supabase);
  const client = await createGetClient(repository)(clientId);
  const result = await createDeleteClient(repository)(clientId);

  if (result.success && client) {
    await removeFromBucket(supabase, CLIENT_AVATARS_BUCKET, client.avatarUrl ?? null);
  }

  revalidatePath(CLIENTS_ROUTE);
  redirect(CLIENTS_ROUTE);
}
