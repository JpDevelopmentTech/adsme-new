"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { JOB_FORM_FIELDS } from "@/constants/job-wizard.constants";
import { JOBS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { JOB_COVERS_BUCKET } from "@/constants/storage.constants";
import { createDeleteJob } from "@/domain/use-cases/delete-job";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { removeFromBucket } from "@/infrastructure/storage/bucket-storage";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Server Action que elimina un trabajo y su portada.
 * La pertenencia la verifica RLS: sin ella el borrado no afecta a ninguna fila.
 */
export async function deleteJobAction(formData: FormData): Promise<void> {
  const jobId = formData.get(JOB_FORM_FIELDS.jobId);
  if (typeof jobId !== "string" || !jobId) return;

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const repository = createSupabaseJobRepository(supabase);
  const job = await createGetJob(repository)(jobId);
  const result = await createDeleteJob(repository)(jobId);

  if (result.success && job) {
    await removeFromBucket(supabase, JOB_COVERS_BUCKET, job.coverUrl);
  }

  revalidatePath(JOBS_ROUTE);
  redirect(JOBS_ROUTE);
}
