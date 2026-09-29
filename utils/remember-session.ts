import type { CookieOptions } from "@supabase/ssr";

/**
 * Ajusta las opciones de las cookies de sesión según la preferencia "Recordarme".
 * Sin recordar, las cookies pierden caducidad y expiran al cerrar el navegador.
 *
 * Un `maxAge` de 0 no es una caducidad sino la orden de borrar: así elimina
 * Supabase sus cookies al cerrar sesión. Quitárselo las dejaba vivas hasta
 * cerrar el navegador.
 */
export function applyRememberPreference(
  options: CookieOptions,
  remember: boolean,
): CookieOptions {
  if (remember || options.maxAge === 0) return options;

  const sessionOptions = { ...options };
  delete sessionOptions.maxAge;
  delete sessionOptions.expires;

  return sessionOptions;
}
