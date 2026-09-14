import type { NextRequest } from "next/server";
import { updateSession } from "@/infrastructure/supabase/update-session";

/**
 * Punto de entrada del proxy de Next.js: refresca la sesión de Supabase en cada request
 * y bloquea el acceso a rutas privadas sin sesión activa.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
