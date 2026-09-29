import type { JobFormat, JobPlatform, JobStatus } from "@/domain/entities/job";
import type { ReportSection } from "@/domain/entities/report-section";

/** Datos del trabajo que ve el artista al abrir su enlace de reporte. */
export interface ReportJob {
  id: string;
  title: string;
  format: JobFormat;
  description: string;
  coverUrl: string | null;
  platforms: JobPlatform[];
  status: JobStatus;
  investment: number;
  startsOn: string;
  endsOn: string;
  clientName: string;
  /** Optimización de CPV activada en el paso 3 del asistente. */
  cpvOptimization: boolean;
  /** CPV cobrado al cliente, en COP; `null` sin optimización. */
  chargedCpv: number | null;
  /** Secciones que el gestor ocultó al cliente. */
  hiddenSections: ReportSection[];
}
