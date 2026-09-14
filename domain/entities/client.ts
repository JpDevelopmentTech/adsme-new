/**
 * Estado del cliente según sus trabajos: en marcha, con trabajos pero ninguno
 * corriendo, o sin ningún trabajo todavía.
 */
export type ClientStatus = "active" | "paused" | "empty";

/** Tipo de cliente dentro del negocio. */
export type ClientKind = "Artista" | "Banda" | "Manager";

/** Par de colores del avatar; el diseño asigna un gradiente distinto a cada cliente. */
export interface ClientAvatarGradient {
  from: string;
  to: string;
}

export interface Client {
  id: string;
  name: string;
  handle: string;
  kind: ClientKind;
  initials: string;
  gradient: ClientAvatarGradient;
  jobsCount: number;
  activeJobsCount: number;
  genre: string;
  status: ClientStatus;
  email: string;
  phone: string;
  city: string;
  country: string;
  notes: string;
  /** Foto del cliente subida por el usuario; sin ella se muestran las iniciales. */
  avatarUrl?: string | null;
  /** Última modificación entre sus trabajos; `null` mientras no tenga ninguno. */
  lastActivityAt: string | null;
  /** Alta del cliente en formato ISO. */
  createdAt: string;
}
