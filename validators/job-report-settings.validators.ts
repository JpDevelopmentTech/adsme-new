import { z } from "zod";
import {
  CHARGED_CPV_MESSAGES,
  USD_COP_RATE_MESSAGES,
} from "@/constants/report-config.constants";
import { TRM_LIMITS } from "@/constants/trm.constants";
import { REPORT_SECTION_KEYS } from "@/domain/entities/report-section";
import { formatTrm } from "@/utils/format-trm";
import { parseTrmInput } from "@/utils/parse-trm-input";

/** Importe con hasta dos decimales; admite coma o punto como separador. */
const CPV_PATTERN = /^\d{1,10}([.,]\d{1,2})?$/;

/** Motivo por el que el CPV escrito no vale; `null` si vale. */
function chargedCpvIssue(value: string): string | null {
  if (value.length === 0) return CHARGED_CPV_MESSAGES.required;
  if (!CPV_PATTERN.test(value)) return CHARGED_CPV_MESSAGES.format;
  if (Number(value.replace(",", ".")) <= 0) return CHARGED_CPV_MESSAGES.positive;

  return null;
}

/** Motivo por el que la TRM escrita no vale; `null` si vale. */
function usdCopRateIssue(value: string): string | null {
  if (value.length === 0) return USD_COP_RATE_MESSAGES.required;

  const rate = parseTrmInput(value);

  if (rate === null) return USD_COP_RATE_MESSAGES.format;
  if (rate < TRM_LIMITS.min || rate > TRM_LIMITS.max) {
    return USD_COP_RATE_MESSAGES.range(
      formatTrm(TRM_LIMITS.min),
      formatTrm(TRM_LIMITS.max),
    );
  }

  return null;
}

/**
 * Valida el paso 3 del asistente. El CPV y la TRM solo se exigen con su
 * interruptor encendido: apagado, lo que quede escrito en el campo se ignora.
 * Cada uno se valida por su lado para que, si fallan los dos, se vean los dos
 * errores a la vez y no uno tras otro.
 */
export const jobReportSettingsSchema = z
  .object({
    cpvOptimization: z.boolean(),
    chargedCpv: z.string().trim(),
    hiddenSections: z.array(z.enum(REPORT_SECTION_KEYS)),
    trmEnabled: z.boolean(),
    usdCopRate: z.string().trim(),
  })
  .superRefine((values, context) => {
    const cpvIssue = values.cpvOptimization
      ? chargedCpvIssue(values.chargedCpv)
      : null;
    const rateIssue = values.trmEnabled ? usdCopRateIssue(values.usdCopRate) : null;

    if (cpvIssue) {
      context.addIssue({ code: "custom", message: cpvIssue, path: ["chargedCpv"] });
    }
    if (rateIssue) {
      context.addIssue({ code: "custom", message: rateIssue, path: ["usdCopRate"] });
    }
  })
  .transform((values) => ({
    cpvOptimization: values.cpvOptimization,
    chargedCpv: values.cpvOptimization
      ? Number(values.chargedCpv.replace(",", "."))
      : null,
    hiddenSections: values.hiddenSections,
    usdCopRate: values.trmEnabled ? parseTrmInput(values.usdCopRate) : null,
  }));

export type JobReportSettingsInput = z.infer<typeof jobReportSettingsSchema>;
