import { BREAKDOWN_SECTION } from "@/constants/breakdown-sections.constants";
import type { CampaignBreakdownSlice } from "@/domain/entities/campaign-breakdown";
import type { ReportSection } from "@/domain/entities/report-section";
import { isReportSectionVisible } from "@/utils/is-report-section-visible";

/** Quita del reparto los ejes (región, sexo, edad) que el gestor ocultó. */
export function filterVisibleBreakdowns(
  slices: CampaignBreakdownSlice[],
  hiddenSections: readonly ReportSection[],
): CampaignBreakdownSlice[] {
  return slices.filter((slice) =>
    isReportSectionVisible(hiddenSections, BREAKDOWN_SECTION[slice.kind]),
  );
}
