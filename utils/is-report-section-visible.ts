import type { ReportSection } from "@/domain/entities/report-section";

/** Si el cliente puede ver una sección del reporte. */
export function isReportSectionVisible(
  hiddenSections: readonly ReportSection[],
  section: ReportSection,
): boolean {
  return !hiddenSections.includes(section);
}
