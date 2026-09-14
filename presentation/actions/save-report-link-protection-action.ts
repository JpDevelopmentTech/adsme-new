"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  LINK_FORM_FIELDS,
  STEP_FOUR_COPY,
} from "@/constants/report-config.constants";
import { LOGIN_ROUTE, jobLinkRoute } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { saveReportLinkProtection } from "@/infrastructure/repositories/report-link-protection";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { toReportProtection } from "@/utils/to-report-protection";

/**
 * Guarda la caducidad y la clave del enlace de un trabajo. La clave viaja al
 * servidor una sola vez y se cifra dentro de Postgres: aquí nunca se almacena.
 */
export async function saveReportLinkProtectionAction(
  formData: FormData,
): Promise<void> {
  const jobId = String(formData.get(LINK_FORM_FIELDS.jobId) ?? "");

  if (!jobId) redirect(LOGIN_ROUTE);

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const protection = toReportProtection(formData);
  const saved = await saveReportLinkProtection(supabase, jobId, protection);
  const target = jobLinkRoute(jobId);

  revalidatePath(target);
  redirect(saved ? target : `${target}?error=${encodeURIComponent(STEP_FOUR_COPY.saveFailed)}`);
}
