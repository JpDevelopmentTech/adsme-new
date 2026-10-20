import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ENV } from "@/infrastructure/supabase/supabase-env";

/** Cliente autenticado como un propietario, con la forma de cerrar su sesión. */
export interface OwnerSession {
  supabase: SupabaseClient;
  /** Revoca solo esta sesión; las que el usuario tenga abiertas no se tocan. */
  close: () => Promise<void>;
}

/**
 * Abre, desde el servidor, una sesión real del propietario `ownerId`.
 *
 * El cron no tiene cookies de nadie, y la sincronización depende de la sesión:
 * RLS aísla los datos de cada usuario y `owner_id` se rellena con `auth.uid()`.
 * En vez de reescribirla para la clave de servicio —donde un filtro olvidado
 * mezclaría cuentas de distintos usuarios— se le da una sesión de verdad: con
 * la clave de servicio se genera un enlace mágico (no se envía ningún correo)
 * y se canjea aquí mismo. Todo lo demás corre con los permisos del usuario.
 *
 * Efecto visible: actualiza el «último acceso» del usuario en Supabase Auth.
 * Lanza si el usuario no existe, no tiene correo o el canje falla.
 */
export async function openOwnerSession(
  admin: SupabaseClient,
  ownerId: string,
): Promise<OwnerSession> {
  const { data: found, error: findError } =
    await admin.auth.admin.getUserById(ownerId);
  const email = found?.user?.email;

  if (findError || !email) {
    throw new Error(`no se encontró el correo del propietario (${findError?.message ?? "sin correo"})`);
  }

  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  if (linkError || !link.properties?.hashed_token) {
    throw new Error(`no se pudo generar el acceso (${linkError?.message ?? "sin token"})`);
  }

  const supabase = createClient(SUPABASE_ENV.url, SUPABASE_ENV.publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const { error: verifyError } = await supabase.auth.verifyOtp({
    type: "magiclink",
    token_hash: link.properties.hashed_token,
  });

  if (verifyError) {
    throw new Error(`no se pudo abrir la sesión (${verifyError.message})`);
  }

  return {
    supabase,
    close: async () => {
      // `local` y no el `global` por defecto, que cerraría también la sesión
      // del usuario en su navegador.
      await supabase.auth.signOut({ scope: "local" });
    },
  };
}
