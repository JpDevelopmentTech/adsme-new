import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  REMEMBER_SESSION_COOKIE,
  REMEMBER_SESSION_ENABLED,
} from "@/constants/auth.constants";
import { LOGIN_ROUTE, PUBLIC_ROUTE_PREFIXES } from "@/constants/routes.constants";
import { SUPABASE_ENV } from "@/infrastructure/supabase/supabase-env";
import { applyRememberPreference } from "@/utils/remember-session";

/**
 * Refresca la sesión de Supabase en cada request y protege las rutas privadas.
 * Debe devolverse la respuesta tal cual para no desincronizar las cookies del navegador.
 */
export async function updateSession(
  request: NextRequest,
): Promise<NextResponse> {
  let response = NextResponse.next({ request });
  const remember =
    request.cookies.get(REMEMBER_SESSION_COOKIE)?.value ===
    REMEMBER_SESSION_ENABLED;

  const supabase = createServerClient(
    SUPABASE_ENV.url,
    SUPABASE_ENV.publishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(
              name,
              value,
              applyRememberPreference(options, remember),
            ),
          );
          Object.entries(headers).forEach(([key, value]) =>
            response.headers.set(key, value),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();

  if (!data?.claims && !isPublicRoute(request.nextUrl.pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = LOGIN_ROUTE;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

/** Indica si la ruta puede visitarse sin sesión activa. */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
