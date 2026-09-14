import type { Client } from "@/domain/entities/client";
import type { ClientFormValues } from "@/types/client-form.types";

/** Proyecta un cliente existente sobre los campos editables del formulario. */
export function toClientFormValues(client: Client): ClientFormValues {
  return {
    name: client.name,
    handle: client.handle,
    kind: client.kind,
    genre: client.genre,
    email: client.email,
    phone: client.phone,
    city: client.city,
    country: client.country,
    notes: client.notes,
  };
}
