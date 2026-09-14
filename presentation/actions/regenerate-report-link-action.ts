"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { JOB_FORM_FIELDS } from "@/constants/job-wizard.constants";
import { JOBS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createRegenerateReportLink } from "@/domain/use-cases/regenerate-report-link";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/** Server Action que revoca el enlace público de un trabajo y emite uno nuevo. */
export async function regenerateReportLinkAction(
  formData: FormData,
): Promise<void> {
  const jobId = formData.get(JOB_FORM_FIELDS.jobId);
  if (typeof jobId !== "string" || !jobId) return;

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  await createRegenerateReportLink(createSupabaseJobRepository(supabase))(jobId);

  revalidatePath(JOBS_ROUTE);
}
