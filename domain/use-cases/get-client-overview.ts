import type { ClientOverview } from "@/domain/entities/client-detail";
import type { ClientRepository } from "@/domain/interfaces/client-repository";
import type { JobRepository } from "@/domain/interfaces/job-repository";
import { buildClientMetrics } from "@/utils/build-client-metrics";

/**
 * Caso de uso: reunir el cliente y sus trabajos para la pantalla de detalle.
 * Devuelve `null` cuando el cliente no existe o no pertenece al usuario.
 */
export function createGetClientOverview(
  clientRepository: ClientRepository,
  jobRepository: JobRepository,
) {
  return async function getClientOverview(
    clientId: string,
  ): Promise<ClientOverview | null> {
    const client = await clientRepository.getClient(clientId);

    if (!client) return null;

    const jobs = await jobRepository.listClientJobs(client.id);

    return { client: { ...client, metrics: buildClientMetrics(jobs) }, jobs };
  };
}
