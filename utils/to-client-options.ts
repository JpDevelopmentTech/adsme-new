import type { Client } from "@/domain/entities/client";
import type { FilterSelectOption } from "@/types/ui.types";

/** Opciones del selector de cliente, identificadas por su id. */
export function toClientOptions(clients: Client[]): FilterSelectOption<string>[] {
  return clients.map((client) => ({
    value: client.id,
    label: `${client.name} · ${client.handle}`,
  }));
}
