"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CLIENT_ERROR_MESSAGES } from "@/constants/client-messages.constants";
import { JOB_FORM_FIELDS } from "@/constants/job-wizard.constants";
import {
  JOBS_ROUTE,
  LOGIN_ROUTE,
  jobCampaignsRoute,
} from "@/constants/routes.constants";
import { JOB_COVERS_BUCKET } from "@/constants/storage.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSaveJob } from "@/domain/use-cases/save-job";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { removeFromBucket } from "@/infrastructure/storage/bucket-storage";
import { resolveUploadedImage } from "@/infrastructure/storage/resolve-uploaded-image";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import type { JobFormState } from "@/types/job-wizard.types";
import { jobBasicsSchema } from "@/validators/job.validators";

/**
 * Server Action del paso 1 del asistente: valida, resuelve la portada y da de
 * alta o actualiza el trabajo. Redirige al listado al terminar.
 */
export async function saveJobAction(
  _prevState: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  const parsed = jobBasicsSchema.safeParse({
    title: formData.get("title"),
    clientId: formData.get("clientId"),
    format: formData.get("format"),
    startsOn: formData.get("startsOn"),
    endsOn: formData.get("endsOn"),
    investment: readInvestment(formData),
    description: formData.get("description") ?? "",
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

  const jobId = readText(formData, JOB_FORM_FIELDS.jobId);
  const previousUrl = readText(formData, JOB_FORM_FIELDS.previousCoverUrl);
  const coverFile = formData.get(JOB_FORM_FIELDS.cover);

  let cover;
  try {
    cover = await resolveUploadedImage(supabase, JOB_COVERS_BUCKET, user.id, {
      file: coverFile instanceof File ? coverFile : null,
      previousUrl,
      remove: formData.get(JOB_FORM_FIELDS.removeCover) === "1",
    });
  } catch {
    return { message: CLIENT_ERROR_MESSAGES.storage_failed, fieldErrors: {} };
  }

  const repository = createSupabaseJobRepository(supabase);
  const result = await createSaveJob(repository)(jobId, {
    ...parsed.data,
    coverUrl: cover.url,
  });

  if (!result.success) {
    // La portada recién subida queda huérfana si la escritura falló.
    if (cover.url && cover.url !== previousUrl) {
      await removeFromBucket(supabase, JOB_COVERS_BUCKET, cover.url);
    }
    return { message: CLIENT_ERROR_MESSAGES[result.error.code], fieldErrors: {} };
  }

  await removeFromBucket(supabase, JOB_COVERS_BUCKET, cover.discardedUrl);

  revalidatePath(JOBS_ROUTE);

  // «Siguiente» continúa el asistente; «Guardar borrador» vuelve al listado.
  redirect(
    formData.get("intent") === "next"
      ? jobCampaignsRoute(result.value.id)
      : JOBS_ROUTE,
  );
}

/** Lee un campo de texto del FormData devolviendo null cuando viene vacío. */
function readText(formData: FormData, field: string): string | null {
  const value = formData.get(field);
  return typeof value === "string" && value.length > 0 ? value : null;
}

/**
 * Lee la inversión ignorando los separadores de miles con los que se escribe.
 * Un campo vacío vale 0: el presupuesto puede fijarse más tarde.
 */
function readInvestment(formData: FormData): number {
  const value = formData.get("investment");

  if (typeof value !== "string") return 0;

  const digits = value.replace(/\D/g, "");

  return digits.length > 0 ? Number(digits) : 0;
}
