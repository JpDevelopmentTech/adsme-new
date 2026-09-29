/**
 * Partes del reporte público que el gestor puede ocultarle al cliente. Se
 * guardan las ocultas y no las visibles: así una sección que se añada más
 * adelante sale visible por defecto en los trabajos que ya existen.
 */
export const REPORT_SECTION_KEYS = [
  "headline",
  "plays",
  "engagement",
  "investment",
  "growth",
  "platforms",
  "platformDetails",
  "adPreview",
  "regions",
  "gender",
  "age",
  "artistReport",
] as const;

export type ReportSection = (typeof REPORT_SECTION_KEYS)[number];
