import type { ClientDraft } from "@/domain/entities/client-draft";

/**
 * Traduce el draft de dominio a las columnas de `public.clients`.
 * `owner_id` no se envía: lo rellena el `default auth.uid()` de la tabla.
 */
export function toClientRow(draft: ClientDraft) {
  return {
    name: draft.name,
    handle: draft.handle,
    kind: draft.kind,
    genre: draft.genre,
    email: draft.email,
    phone: draft.phone,
    city: draft.city,
    country: draft.country,
    notes: draft.notes,
    avatar_url: draft.avatarUrl,
  };
}
