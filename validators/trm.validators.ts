import { z } from "zod";

/**
 * Fila de la TRM tal como la devuelve datos.gov.co. El valor llega como texto
 * (`"3156.32"`) y las fechas como marcas sin zona (`2026-10-20T00:00:00.000`).
 */
export const trmRowSchema = z.object({
  valor: z.coerce.number().positive(),
  unidad: z.literal("COP"),
  vigenciadesde: z.string().regex(/^\d{4}-\d{2}-\d{2}T/),
  vigenciahasta: z.string().regex(/^\d{4}-\d{2}-\d{2}T/),
});

/** Respuesta de la consulta: como mucho una fila. */
export const trmResponseSchema = z.array(trmRowSchema).max(1);

export type TrmRow = z.infer<typeof trmRowSchema>;
