import { LINK_FORM_FIELDS } from "@/constants/report-config.constants";
import type { ReportLinkProtection } from "@/domain/entities/report-link-protection";

/** Lee un campo del formulario como texto ya recortado. */
function readText(formData: FormData, field: string): string {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

/**
 * Traduce el formulario del paso 4. Cada protección solo se aplica si su
 * interruptor está activo: apagarlo retira la condición, aunque el campo
 * conserve lo que se escribió antes.
 */
export function toReportProtection(formData: FormData): ReportLinkProtection {
  const wantsPassword = formData.get(LINK_FORM_FIELDS.passwordEnabled) === "on";
  const wantsExpiry = formData.get(LINK_FORM_FIELDS.expiryEnabled) === "on";

  const password = readText(formData, LINK_FORM_FIELDS.password);
  const expiresOn = readText(formData, LINK_FORM_FIELDS.expiresOn);

  return {
    password: wantsPassword && password.length > 0 ? password : null,
    // El enlace vence al terminar el día elegido, no a las 00:00.
    expiresAt:
      wantsExpiry && expiresOn.length > 0
        ? new Date(`${expiresOn}T23:59:59`).toISOString()
        : null,
  };
}
