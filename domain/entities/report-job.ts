import type { JobFormat, JobPlatform, JobStatus } from "@/domain/entities/job";

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
}
