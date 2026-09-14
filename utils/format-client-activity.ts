import { CLIENT_CARD_COPY } from "@/constants/clients.constants";
import type { Client } from "@/domain/entities/client";
import { formatRelativeTime } from "@/utils/format-relative-time";

/**
 * Pie de la tarjeta: cuándo se movió el cliente por última vez. Sin trabajos
 * todavía no hay actividad que contar, así que se informa del alta.
 */
export function formatClientActivity(client: Client, nowIso: string): string {
  return client.lastActivityAt
    ? CLIENT_CARD_COPY.lastActivity(
        formatRelativeTime(client.lastActivityAt, nowIso),
      )
    : CLIENT_CARD_COPY.addedAt(formatRelativeTime(client.createdAt, nowIso));
}
