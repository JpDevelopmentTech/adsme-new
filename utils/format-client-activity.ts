import { CLIENT_ROW_COPY } from "@/constants/clients.constants";
import type { Client } from "@/domain/entities/client";
import { formatRelativeTime } from "@/utils/format-relative-time";

/**
 * Pie de la fila: cuándo se movió el cliente por última vez. Un cliente en
 * pausa no tiene actividad que contar sino tiempo parado, y por eso se nombra
 * distinto: es la diferencia entre «va lento» y «está olvidado».
 */
export function formatClientActivity(client: Client, nowIso: string): string {
  if (!client.lastActivityAt) {
    return CLIENT_ROW_COPY.addedAt(
      formatRelativeTime(client.createdAt, nowIso),
    );
  }

  const relative = formatRelativeTime(client.lastActivityAt, nowIso);

  return client.status === "paused"
    ? CLIENT_ROW_COPY.stale(relative)
    : CLIENT_ROW_COPY.lastActivity(relative);
}
