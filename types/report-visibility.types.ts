import type { ReportSection } from "@/domain/entities/report-section";

/** Una opción de visibilidad del paso 3: qué sección controla y cómo se nombra. */
export interface ReportVisibilityOption {
  section: ReportSection;
  label: string;
  description: string;
}

/** Opciones de visibilidad agrupadas por la pregunta que responden. */
export interface ReportVisibilityGroup {
  title: string;
  options: ReportVisibilityOption[];
}
