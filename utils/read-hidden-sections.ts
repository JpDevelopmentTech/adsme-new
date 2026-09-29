import { REPORT_VISIBILITY_FIELD_PREFIX } from "@/constants/report-visibility.constants";
import {
  REPORT_SECTION_KEYS,
  type ReportSection,
} from "@/domain/entities/report-section";

/**
 * Secciones apagadas en el formulario del paso 3. Un checkbox desmarcado no
 * viaja en el FormData, así que se recorre la lista conocida y se marca como
 * oculta toda sección cuyo interruptor no llegó encendido.
 */
export function readHiddenSections(formData: FormData): ReportSection[] {
  return REPORT_SECTION_KEYS.filter(
    (section) =>
      formData.get(`${REPORT_VISIBILITY_FIELD_PREFIX}${section}`) !== "on",
  );
}
