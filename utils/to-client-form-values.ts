import type { Client } from "@/domain/entities/client";
import type { ClientFormValues } from "@/types/client-form.types";
import { stripClientHandle } from "@/utils/normalize-client-handle";

/**
 * Proyecta un cliente existente sobre los campos editables del formulario. El
 * usuario va sin arroba porque el campo ya la pinta delante.
 */
export function toClientFormValues(client: Client): ClientFormValues {
  return {
    name: client.name,
    handle: stripClientHandle(client.handle),
    kind: client.kind,
    genre: client.genre,
    email: client.email,
    phone: client.phone,
    city: client.city,
    country: client.country,
    notes: client.notes,
  };
}
