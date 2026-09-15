import { NextResponse, type NextRequest } from "next/server";
import { CONNECTIONS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import {
  TIKTOK_ERRORS,
  TIKTOK_PICK_ACCOUNT_PARAM,
  TIKTOK_PICK_ACCOUNT_VALUE,
  TIKTOK_STATE_COOKIE,
} from "@/constants/tiktok-ads.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createRegisterPlatformAccess } from "@/domain/use-cases/register-platform-access";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { TiktokApiError } from "@/infrastructure/tiktok/tiktok-api-error";
import {
  exchangeCodeForToken,
  fetchAdvertisers,
} from "@/infrastructure/tiktok/tiktok-oauth";
import { resolveOrigin } from "@/utils/resolve-origin";

/**
 * Cierra el OAuth de TikTok: valida el `state` y canjea el código por el
 * acceso. En la primera conexión deja vinculada una cuenta de anunciante para
 * que la pantalla quede en un estado válido y, si hay más de una, vuelve
 * pidiendo elegir de cuáles importar. Al reautorizar no toca la selección, solo
 * renueva el token de sus cuentas.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const origin = resolveOrigin(request.headers);
  // TikTok devuelve el código como `auth_code`, no como `code`.
  const authCode =
    request.nextUrl.searchParams.get("auth_code") ??
    request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(TIKTOK_STATE_COOKIE)?.value;

  if (!authCode || !state || !expectedState || state !== expectedState) {
    return backToConnections(origin, TIKTOK_ERRORS.stateMismatch);
  }

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) return NextResponse.redirect(new URL(LOGIN_ROUTE, origin));

  let token;
  let advertisers;
  try {
    token = await exchangeCodeForToken(authCode);
    if (!token) return backToConnections(origin, TIKTOK_ERRORS.exchangeFailed);

    advertisers = await fetchAdvertisers(token.accessToken);
  } catch (error) {
    // El motivo lo da TikTok; sin él «no hay cuentas» y «falló la consulta» se
    // ven igual y no hay forma de saber qué corregir.
    const detail = error instanceof TiktokApiError ? error.message : "";
    return backToConnections(
      origin,
      detail
        ? `${TIKTOK_ERRORS.advertisersFailed} ${detail}`
        : TIKTOK_ERRORS.advertisersFailed,
    );
  }

  const [advertiser] = advertisers;

  if (!advertiser) return backToConnections(origin, TIKTOK_ERRORS.noAdvertisers);

  const saved = await createRegisterPlatformAccess(
    createSupabaseConnectionRepository(supabase),
  )(
    {
      platform: "tiktok",
      accountLabel: advertiser.name,
      externalAccountId: advertiser.id,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      tokenExpiresAt: token.expiresAt,
      scopes: "",
      extra: { currency: advertiser.currency },
    },
    user.id,
  );

  const response = !saved
    ? backToConnections(origin, TIKTOK_ERRORS.exchangeFailed)
    : backToConnections(origin, null, advertisers.length > 1);
  response.cookies.delete(TIKTOK_STATE_COOKIE);

  return response;
}

/** Vuelve a Conexiones, con el error o la petición de elegir cuenta en la URL. */
function backToConnections(
  origin: string,
  error: string | null,
  pickAccount = false,
): NextResponse {
  const url = new URL(CONNECTIONS_ROUTE, origin);

  if (error) url.searchParams.set("error", error);
  if (pickAccount) {
    url.searchParams.set(TIKTOK_PICK_ACCOUNT_PARAM, TIKTOK_PICK_ACCOUNT_VALUE);
  }

  return NextResponse.redirect(url);
}
