import { z } from "zod";
import { CHARGED_CPV_MESSAGES } from "@/constants/report-config.constants";
import { REPORT_SECTION_KEYS } from "@/domain/entities/report-section";

/** Importe con hasta dos decimales; admite coma o punto como separador. */
const CPV_PATTERN = /^\d{1,10}([.,]\d{1,2})?$/;

/**
 * Valida el paso 3 del asistente. El CPV solo se exige con la optimización
 * encendida: apagada, lo que quede escrito en el campo se ignora.
 */
export const jobReportSettingsSchema = z
  .object({
    cpvOptimization: z.boolean(),
    chargedCpv: z.string().trim(),
    hiddenSections: z.array(z.enum(REPORT_SECTION_KEYS)),
  })
  .superRefine((values, context) => {
    if (!values.cpvOptimization) return;

    const issue = (message: string) =>
      context.addIssue({ code: "custom", message, path: ["chargedCpv"] });

    if (values.chargedCpv.length === 0) return issue(CHARGED_CPV_MESSAGES.required);
    if (!CPV_PATTERN.test(values.chargedCpv)) return issue(CHARGED_CPV_MESSAGES.format);
    if (Number(values.chargedCpv.replace(",", ".")) <= 0) {
      issue(CHARGED_CPV_MESSAGES.positive);
    }
  })
  .transform((values) => ({
    cpvOptimization: values.cpvOptimization,
    chargedCpv: values.cpvOptimization
      ? Number(values.chargedCpv.replace(",", "."))
      : null,
    hiddenSections: values.hiddenSections,
  }));

export type JobReportSettingsInput = z.infer<typeof jobReportSettingsSchema>;
