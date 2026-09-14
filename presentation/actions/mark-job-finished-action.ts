"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { JOB_FORM_FIELDS } from "@/constants/job-wizard.constants";
import { JOBS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Server Action que marca el trabajo como finalizado. No toca las campañas en
 * la plataforma: solo cambia cómo lo muestra adsme.
 */
export async function markJobFinishedAction(formData: FormData): Promise<void> {
  const jobId = formData.get(JOB_FORM_FIELDS.jobId);
  if (typeof jobId !== "string" || !jobId) return;

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  await supabase.from("jobs").update({ status: "finished" }).eq("id", jobId);

  revalidatePath(JOBS_ROUTE);
}
