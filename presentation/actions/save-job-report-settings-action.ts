"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
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
 * reporte ve el cliente, la optimización de CPV y la TRM, y sigue al paso 4.
 * Si algo falla devuelve el error de cada campo al formulario sin perder lo
 * escrito.
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
    trmEnabled: formData.get(REPORT_SETTINGS_FIELDS.trmEnabled) === "on",
    usdCopRate: String(formData.get(REPORT_SETTINGS_FIELDS.usdCopRate) ?? ""),
  });

  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);

    return {
      message: null,
      fieldErrors: {
        chargedCpv: fieldErrors.chargedCpv?.[0],
        usdCopRate: fieldErrors.usdCopRate?.[0],
      },
    };
  }

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const saved = await createSaveJobReportSettings(
    createSupabaseJobReportSettingsRepository(supabase),
  )(jobId, parsed.data);

  if (!saved) {
    return { message: STEP_THREE_COPY.saveFailed, fieldErrors: {} };
  }

  revalidatePath(jobReportRoute(jobId));
  redirect(jobLinkRoute(jobId));
}
