import type { Job, JobCoverGradient, JobPlatform } from "@/domain/entities/job";

export interface JobCoverProps {
  /** Gradiente heredado; la portada v3 ya no lo pinta, pero se conserva en la firma. */
  cover?: JobCoverGradient;
  /** Portada subida; sin ella se pinta el gradiente. */
  imageUrl?: string | null;
  /** Nombre del trabajo, usado como texto alternativo de la imagen. */
  title?: string;
  /** Lado de la portada en px; por defecto 36. */
  size?: number;
}

export interface JobPlatformsProps {
  platforms: JobPlatform[];
  /** Nombre del trabajo, usado para describir la lista de plataformas. */
  jobTitle: string;
}

export interface ClientJobRowProps {
  job: Job;
}

export interface ClientJobsTableProps {
  jobs: Job[];
}
