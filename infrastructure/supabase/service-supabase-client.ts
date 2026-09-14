import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ENV } from "@/infrastructure/supabase/supabase-env";

/**
 * Cliente con la clave de servicio, que no pasa por RLS.
 *
 * Existe solo para el endpoint de ingesta de Google Ads: allí no hay sesión de
 * usuario porque quien llama es un script externo, ya autenticado por su
 * secreto compartido. No debe usarse en ningún flujo que sí tenga sesión: RLS
 * es lo que aísla a unos usuarios de otros y esta clave se la salta entera.
 */
export function createServiceSupabaseClient(): SupabaseClient {
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!secretKey) throw new Error("Falta SUPABASE_SECRET_KEY.");

  return createClient(SUPABASE_ENV.url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
