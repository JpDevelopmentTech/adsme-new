import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  REMEMBER_SESSION_COOKIE,
  REMEMBER_SESSION_ENABLED,
} from "@/constants/auth.constants";
import { SUPABASE_ENV } from "@/infrastructure/supabase/supabase-env";
import { applyRememberPreference } from "@/utils/remember-session";

/**
 * Crea el cliente de Supabase para Server Components, Server Actions y Route Handlers.
 * Respeta la preferencia "Recordarme" guardada en cookie al persistir la sesión.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const remember =
    cookieStore.get(REMEMBER_SESSION_COOKIE)?.value === REMEMBER_SESSION_ENABLED;

  return createServerClient(SUPABASE_ENV.url, SUPABASE_ENV.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(
              name,
              value,
              applyRememberPreference(options, remember),
            ),
          );
        } catch {
          // Invocado desde un Server Component: el proxy ya refresca la sesión.
        }
      },
    },
  });
}
