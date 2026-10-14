/** Color del semáforo de un artista según los shows que lleva en el mes. */
export type NominaSemaphore = "verde" | "amarillo" | "rojo";

/** Estado de escalabilidad: si el artista ya cumplió su mínimo de shows. */
export type NominaScalability = "Escalable" | "En Desarrollo";

/** Lo mínimo para pintar a un artista: nombre, foto y semáforo. */
export interface NominaArtistSummary {
  id: string;
  name: string;
  photoUrl: string | null;
  semaphore: NominaSemaphore;
}

/** Avance hacia la meta de shows del mes, con los que solo cubrieron el Servicio. */
export interface NominaShowProgress {
  shows: number;
  minShows: number;
  /** Shows del mes cuyo dinero fue a cubrir el Servicio. */
  serviceShows: number;
}
