import { z } from "zod";

const supabaseEnvSchema = z.object({
  url: z.url(),
  publishableKey: z.string().min(1),
});

/**
 * Lee y valida las variables públicas de Supabase.
 * Las referencias a `process.env` son literales para que Next.js pueda inlinearlas en el bundle.
 */
export const SUPABASE_ENV = supabaseEnvSchema.parse({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
});
