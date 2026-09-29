import type { BreakdownKind } from "@/domain/entities/campaign-breakdown";
import type { ReportSection } from "@/domain/entities/report-section";

/** Sección del reporte que controla cada eje del reparto de audiencia. */
export const BREAKDOWN_SECTION: Record<BreakdownKind, ReportSection> = {
  region: "regions",
  gender: "gender",
  age: "age",
};
