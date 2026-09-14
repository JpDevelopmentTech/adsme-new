import { z } from "zod";

const reportLinkEnvSchema = z.object({
  secret: z.string().min(32, {
    message: "REPORT_LINK_SECRET debe tener al menos 32 caracteres.",
  }),
  appUrl: z.url(),
});

/**
 * Secreto de firma y URL pública de la app. El secreto nunca lleva el prefijo
 * `NEXT_PUBLIC_`: solo debe existir en el servidor.
 */
export const REPORT_LINK_ENV = reportLinkEnvSchema.parse({
  secret: process.env.REPORT_LINK_SECRET,
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
});
