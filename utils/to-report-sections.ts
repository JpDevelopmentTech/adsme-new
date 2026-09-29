import {
  REPORT_SECTION_KEYS,
  type ReportSection,
} from "@/domain/entities/report-section";

/**
 * Lee las secciones guardadas en base de datos quedándose solo con las que la
 * app conoce: una clave retirada del código no debe romper el reporte.
 */
export function toReportSections(values: readonly string[] | null): ReportSection[] {
  const known = new Set<string>(REPORT_SECTION_KEYS);

  return (values ?? []).filter((value): value is ReportSection => known.has(value));
}
