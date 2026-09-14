import type { Client } from "@/domain/entities/client";
import type { ActivityItem } from "@/domain/entities/dashboard";
import type { JobListing } from "@/domain/entities/job-listing";

/** Cuántos eventos caben en el panel de actividad del diseño. */
const MAX_ACTIVITY_ITEMS = 6;

/**
 * Construye la actividad reciente a partir de las altas y modificaciones reales.
 * Cuando exista una tabla de auditoría, este derivado se sustituye por su lectura.
 */
export function buildActivityFeed(
  clients: Client[],
  jobs: JobListing[],
): ActivityItem[] {
  const items: ActivityItem[] = [
    ...clients.map<ActivityItem>((client) => ({
      id: `client-${client.id}`,
      kind: "client-created",
      text: `Nuevo cliente: ${client.name}`,
      at: client.createdAt,
    })),
    ...jobs.map<ActivityItem>((job) => ({
      id: `job-${job.id}`,
      kind: "job-created",
      text: `Nuevo trabajo «${job.title}» para ${job.artistName}`,
      at: job.createdAt,
    })),
    ...jobs
      .filter((job) => job.updatedAt !== job.createdAt)
      .map<ActivityItem>((job) => ({
        id: `job-updated-${job.id}`,
        kind: "job-updated",
        text: `Se actualizó «${job.title}»`,
        at: job.updatedAt,
      })),
  ];

  return items
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, MAX_ACTIVITY_ITEMS);
}
