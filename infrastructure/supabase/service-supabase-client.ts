import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ENV } from "@/infrastructure/supabase/supabase-env";

/**
 * Cliente con la clave de servicio, que no pasa por RLS.
 *
 * Solo para lo que no tiene sesión de usuario o no es de ningún usuario:
 * - el endpoint de ingesta de Google Ads, al que llama un script externo ya
 *   autenticado por su secreto compartido;
 * - el cron diario, que lo usa para abrir la sesión de cada propietario
 *   (`openOwnerSession`), no para leer ni escribir sus datos.
 *
 * No debe usarse para datos de un usuario: RLS es lo que aísla a unos de otros
 * y esta clave se la salta entera.
 */
export function createServiceSupabaseClient(): SupabaseClient {
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!secretKey) throw new Error("Falta SUPABASE_SECRET_KEY.");

  return createClient(SUPABASE_ENV.url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
