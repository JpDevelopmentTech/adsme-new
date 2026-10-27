import { CLIENT_SECTORS } from "@/constants/client-form.constants";
import type { Client } from "@/domain/entities/client";
import type { ClientFormValues } from "@/types/client-form.types";
import { stripClientHandle } from "@/utils/normalize-client-handle";

/**
 * Proyecta un cliente existente sobre los campos editables del formulario. El
 * usuario va sin arroba porque el campo ya la pinta delante. Un sector que ya
 * no está en la lista (los géneros musicales de antes) llega vacío, para que se
 * elija a mano y el desplegable no guarde en silencio su primera opción.
 */
export function toClientFormValues(client: Client): ClientFormValues {
  return {
    name: client.name,
    handle: stripClientHandle(client.handle),
    kind: client.kind,
    genre: (CLIENT_SECTORS as readonly string[]).includes(client.genre) ? client.genre : "",
    email: client.email,
    phone: client.phone,
    city: client.city,
    country: client.country,
    notes: client.notes,
  };
}
