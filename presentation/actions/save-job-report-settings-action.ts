"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  REPORT_SETTINGS_FIELDS,
  STEP_THREE_COPY,
} from "@/constants/report-config.constants";
import {
  LOGIN_ROUTE,
  jobLinkRoute,
  jobReportRoute,
} from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSaveJobReportSettings } from "@/domain/use-cases/save-job-report-settings";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseJobReportSettingsRepository } from "@/infrastructure/repositories/supabase-job-report-settings-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import type { ReportSettingsFormState } from "@/types/job-wizard.types";
import { readHiddenSections } from "@/utils/read-hidden-sections";
import { jobReportSettingsSchema } from "@/validators/job-report-settings.validators";

/**
 * Server Action del paso 3 del asistente: valida y guarda qué partes del
 * reporte ve el cliente y la optimización de CPV, y sigue al paso 4. Si algo
 * falla devuelve el error al formulario sin perder lo escrito.
 */
export async function saveJobReportSettingsAction(
  _prevState: ReportSettingsFormState,
  formData: FormData,
): Promise<ReportSettingsFormState> {
  const jobId = String(formData.get(REPORT_SETTINGS_FIELDS.jobId) ?? "");
  const parsed = jobReportSettingsSchema.safeParse({
    cpvOptimization: formData.get(REPORT_SETTINGS_FIELDS.cpvOptimization) === "on",
    chargedCpv: String(formData.get(REPORT_SETTINGS_FIELDS.chargedCpv) ?? ""),
    hiddenSections: readHiddenSections(formData),
  });

  if (!parsed.success) {
    return {
      message: null,
      chargedCpvError: parsed.error.issues[0]?.message ?? null,
    };
  }

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const saved = await createSaveJobReportSettings(
    createSupabaseJobReportSettingsRepository(supabase),
  )(jobId, parsed.data);

  if (!saved) {
    return { message: STEP_THREE_COPY.saveFailed, chargedCpvError: null };
  }

  revalidatePath(jobReportRoute(jobId));
  redirect(jobLinkRoute(jobId));
}
