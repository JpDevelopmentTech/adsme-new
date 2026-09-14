import { cookies } from "next/headers";
import {
  REMEMBER_SESSION_COOKIE,
  REMEMBER_SESSION_ENABLED,
  REMEMBER_SESSION_MAX_AGE_SECONDS,
} from "@/constants/auth.constants";

/**
 * Guarda la preferencia "Recordarme" antes de crear la sesión.
 * Sin recordar se escribe como cookie de sesión para que muera al cerrar el navegador.
 */
export async function persistRememberPreference(
  remember: boolean,
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(REMEMBER_SESSION_COOKIE, remember ? REMEMBER_SESSION_ENABLED : "0", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(remember ? { maxAge: REMEMBER_SESSION_MAX_AGE_SECONDS } : {}),
  });
}
