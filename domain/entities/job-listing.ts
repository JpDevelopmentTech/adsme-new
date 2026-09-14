import type { Job } from "@/domain/entities/job";

/**
 * Trabajo tal como lo necesita el listado global `B5`, que además del trabajo
 * muestra a qué artista pertenece.
 */
export interface JobListing extends Job {
  artistName: string;
  clientHandle: string;
}
