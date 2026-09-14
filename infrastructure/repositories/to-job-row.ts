import type { JobDraft } from "@/domain/entities/job-draft";

/**
 * Traduce el draft de dominio a las columnas de `public.jobs`.
 * `owner_id` no se envía: lo rellena el `default auth.uid()` de la tabla.
 * `platforms` y `status` los fija el paso 2 del asistente.
 */
export function toJobRow(draft: JobDraft) {
  return {
    client_id: draft.clientId,
    title: draft.title,
    format: draft.format,
    description: draft.description,
    cover_url: draft.coverUrl,
    starts_on: draft.startsOn,
    ends_on: draft.endsOn,
    investment: draft.investment,
  };
}
