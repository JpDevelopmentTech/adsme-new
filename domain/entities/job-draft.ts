import type { JobFormat } from "@/domain/entities/job";

/** Datos que el usuario aporta en el paso 1 del asistente. */
export interface JobDraft {
  clientId: string;
  title: string;
  format: JobFormat;
  description: string;
  startsOn: string;
  endsOn: string;
  /** Presupuesto de pauta del trabajo, en la moneda base del negocio (COP). */
  investment: number;
  /** URL pública de la portada ya subida, o `null` para dejarlo sin portada. */
  coverUrl: string | null;
}
