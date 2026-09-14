"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CLIENT_ERROR_MESSAGES,
  CLIENT_FORM_FIELDS,
} from "@/constants/client-messages.constants";
import { CLIENTS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { CLIENT_AVATARS_BUCKET } from "@/constants/storage.constants";
import type { ClientResult } from "@/domain/entities/client-error";
import type { Client } from "@/domain/entities/client";
import { createCreateClient } from "@/domain/use-cases/create-client";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createUpdateClient } from "@/domain/use-cases/update-client";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { removeFromBucket } from "@/infrastructure/storage/bucket-storage";
import { resolveUploadedImage } from "@/infrastructure/storage/resolve-uploaded-image";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import type { ClientFormState } from "@/types/client-form.types";
import { clientFormSchema } from "@/validators/client.validators";

/**
 * Server Action del formulario de clientes: valida, resuelve la foto y da de
 * alta o actualiza según venga o no un identificador. Redirige al listado al
 * terminar; los fallos esperables vuelven como estado para pintarlos en la UI.
 */
export async function saveClientAction(
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const parsed = clientFormSchema.safeParse({
    name: formData.get("name"),
    handle: formData.get("handle"),
    kind: formData.get("kind"),
    genre: formData.get("genre"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    country: formData.get("country"),
    notes: formData.get("notes") ?? "",
  });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      message: null,
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [
          field,
          messages?.[0],
        ]),
      ),
    };
  }

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const clientId = readText(formData, CLIENT_FORM_FIELDS.clientId);
  const previousUrl = readText(formData, CLIENT_FORM_FIELDS.previousAvatarUrl);
  const avatarFile = formData.get(CLIENT_FORM_FIELDS.avatar);

  let avatar;
  try {
    avatar = await resolveUploadedImage(supabase, CLIENT_AVATARS_BUCKET, user.id, {
      file: avatarFile instanceof File ? avatarFile : null,
      previousUrl,
      remove: formData.get(CLIENT_FORM_FIELDS.removeAvatar) === "1",
    });
  } catch {
    return { message: CLIENT_ERROR_MESSAGES.storage_failed, fieldErrors: {} };
  }

  const repository = createSupabaseClientRepository(supabase);
  const draft = { ...parsed.data, avatarUrl: avatar.url };
  const result: ClientResult<Client> = clientId
    ? await createUpdateClient(repository)(clientId, draft)
    : await createCreateClient(repository)(draft);

  if (!result.success) {
    // La foto recién subida queda huérfana si la escritura falló.
    if (avatar.url && avatar.url !== previousUrl) {
      await removeFromBucket(supabase, CLIENT_AVATARS_BUCKET, avatar.url);
    }
    return {
      message: CLIENT_ERROR_MESSAGES[result.error.code],
      fieldErrors:
        result.error.code === "duplicate_handle"
          ? { handle: CLIENT_ERROR_MESSAGES.duplicate_handle }
          : {},
    };
  }

  await removeFromBucket(supabase, CLIENT_AVATARS_BUCKET, avatar.discardedUrl);

  revalidatePath(CLIENTS_ROUTE);
  redirect(CLIENTS_ROUTE);
}

/** Lee un campo de texto del FormData devolviendo null cuando viene vacío. */
function readText(formData: FormData, field: string): string | null {
  const value = formData.get(field);
  return typeof value === "string" && value.length > 0 ? value : null;
}
