import type { CookieOptions } from "@supabase/ssr";

/**
 * Ajusta las opciones de las cookies de sesión según la preferencia "Recordarme".
 * Sin recordar, las cookies pierden caducidad y expiran al cerrar el navegador.
 */
export function applyRememberPreference(
  options: CookieOptions,
  remember: boolean,
): CookieOptions {
  if (remember) return options;

  const sessionOptions = { ...options };
  delete sessionOptions.maxAge;
  delete sessionOptions.expires;

  return sessionOptions;
}
