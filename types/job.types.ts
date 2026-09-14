import type { Job, JobCoverGradient, JobPlatform } from "@/domain/entities/job";

export interface JobCoverProps {
  cover: JobCoverGradient;
  /** Portada subida; sin ella se pinta el gradiente. */
  imageUrl?: string | null;
  /** Nombre del trabajo, usado como texto alternativo de la imagen. */
  title?: string;
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
