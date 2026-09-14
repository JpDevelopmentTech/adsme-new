import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ERROR_MESSAGES } from "@/constants/auth-messages.constants";
import { LOGIN_ROUTE, POST_LOGIN_ROUTE } from "@/constants/routes.constants";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Cierra el flujo OAuth: canjea el `code` del proveedor por una sesión y redirige al panel.
 * Ante cualquier fallo devuelve al login con un mensaje legible.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return redirectToLoginWithError(request);
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirectToLoginWithError(request);
  }

  return NextResponse.redirect(new URL(POST_LOGIN_ROUTE, request.url));
}

/** Construye la redirección al login incluyendo el mensaje de error genérico. */
function redirectToLoginWithError(request: NextRequest): NextResponse {
  const url = new URL(LOGIN_ROUTE, request.url);
  url.searchParams.set("error", AUTH_ERROR_MESSAGES.unknown);

  return NextResponse.redirect(url);
}
