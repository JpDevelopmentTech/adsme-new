import type { NominaSemaphore } from "@/domain/entities/nomina-artist";

/** Clase de fondo de cada color del semáforo. */
export const SEMAPHORE_DOT_CLASSES: Record<NominaSemaphore, string> = {
  verde: "bg-success",
  amarillo: "bg-warning",
  rojo: "bg-danger",
};

/** Lectura del semáforo para lectores de pantalla: el color nunca va solo. */
export const SEMAPHORE_LABELS: Record<NominaSemaphore, string> = {
  verde: "Cumplió el mínimo de shows del mes",
  amarillo: "Tiene shows en el mes, sin llegar al mínimo",
  rojo: "Sin shows en el mes",
};
