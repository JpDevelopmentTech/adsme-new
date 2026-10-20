import "server-only";

/**
 * Secreto con el que Vercel firma las llamadas al cron. Vercel lo envía solo,
 * como `Authorization: Bearer <CRON_SECRET>`, si la variable está definida en
 * el proyecto. `null` si falta: entonces el cron no debe aceptar nada.
 */
export function getCronSecret(): string | null {
  return process.env.CRON_SECRET || null;
}
