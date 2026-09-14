/** Plataformas de pauta soportadas por adsme. */
export type JobPlatform = "youtube" | "meta" | "tiktok";

/** Estado de la campaña asociada al trabajo, según los badges de `B3`. */
export type JobStatus = "active" | "finished" | "syncing";

/** Formato del lanzamiento sobre el que se pauta. */
export type JobFormat = "Single" | "EP" | "Álbum";

/** Par de colores de la portada, usado cuando el trabajo no tiene imagen propia. */
export interface JobCoverGradient {
  from: string;
  to: string;
}

export interface Job {
  id: string;
  clientId: string;
  title: string;
  format: JobFormat;
  description: string;
  /** Portada subida por el usuario; sin ella se pinta el gradiente. */
  coverUrl: string | null;
  /** Gradiente derivado del identificador, estable entre renders y sesiones. */
  cover: JobCoverGradient;
  platforms: JobPlatform[];
  status: JobStatus;
  /** Inversión en pauta del trabajo, en la moneda base del negocio (COP). */
  investment: number;
  /** Inicio de la pauta en formato ISO (`YYYY-MM-DD`). */
  startsOn: string;
  /** Fin de la pauta en formato ISO (`YYYY-MM-DD`). */
  endsOn: string;
  /** Enlace público del reporte; `null` mientras no se haya generado su token. */
  reportUrl: string | null;
  /** Alta y última modificación en formato ISO. */
  createdAt: string;
  updatedAt: string;
}
