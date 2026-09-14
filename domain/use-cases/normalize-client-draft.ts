import type { ClientDraft } from "@/domain/entities/client-draft";

/**
 * Normaliza los datos antes de persistirlos: el @usuario y el correo se guardan
 * siempre en minúsculas para que la unicidad por usuario no dependa del formato.
 */
export function normalizeClientDraft(draft: ClientDraft): ClientDraft {
  return {
    ...draft,
    name: draft.name.trim(),
    handle: draft.handle.trim().toLowerCase(),
    genre: draft.genre.trim(),
    email: draft.email.trim().toLowerCase(),
    phone: draft.phone.trim(),
    city: draft.city.trim(),
    country: draft.country.trim(),
    notes: draft.notes.trim(),
  };
}
