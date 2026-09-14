import { NextResponse, type NextRequest } from "next/server";
import {
  META_CALLBACK_PATH,
  META_ERRORS,
  META_PICK_ACCOUNT_PARAM,
  META_PICK_ACCOUNT_VALUE,
  META_SCOPES,
  META_STATE_COOKIE,
} from "@/constants/meta-ads.constants";
import { CONNECTIONS_ROUTE, LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import {
  exchangeCodeForToken,
  exchangeForLongLivedToken,
  fetchAdAccounts,
} from "@/infrastructure/meta/meta-api";
import { MetaApiError } from "@/infrastructure/meta/meta-api-error";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { resolveOrigin } from "@/utils/resolve-origin";

/**
 * Cierra el OAuth de Meta: valida el `state` y canjea el código por un token de
 * larga duración. Deja conectada la primera cuenta publicitaria para que la
 * pantalla quede en un estado válido, pero si hay más de una vuelve pidiendo
 * elegir: cuál es «la primera» lo decide Meta, no el usuario.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const origin = resolveOrigin(request.headers);
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(META_STATE_COOKIE)?.value;

  // Comparar contra la cookie corta el CSRF: sin ella la vuelta no es nuestra.
  if (!code || !state || !expectedState || state !== expectedState) {
    return backToConnections(origin, META_ERRORS.stateMismatch);
  }

  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) return NextResponse.redirect(new URL(LOGIN_ROUTE, origin));

  const shortLived = await exchangeCodeForToken(
    code,
    `${origin}${META_CALLBACK_PATH}`,
  );
  const token = shortLived ? await exchangeForLongLivedToken(shortLived) : null;

  if (!token) return backToConnections(origin, META_ERRORS.exchangeFailed);

  let accounts;
  try {
    accounts = await fetchAdAccounts(token.accessToken);
  } catch (error) {
    // El motivo lo da Meta; sin él «no hay cuentas» y «falló la consulta» se
    // ven igual y no hay forma de saber qué corregir.
    const detail = error instanceof MetaApiError ? error.message : "";
    return backToConnections(
      origin,
      detail
        ? `${META_ERRORS.adAccountsFailed} ${detail}`
        : META_ERRORS.adAccountsFailed,
    );
  }

  const [account] = accounts;

  if (!account) return backToConnections(origin, META_ERRORS.noAdAccounts);

  const saved = await createSupabaseConnectionRepository(supabase).saveConnection(
    {
      platform: "meta",
      accountLabel: account.name,
      externalAccountId: account.id,
      accessToken: token.accessToken,
      // Meta no entrega refresh_token: el de larga duración se reautoriza.
      refreshToken: null,
      tokenExpiresAt: token.expiresAt,
      scopes: META_SCOPES.join(","),
      extra: { accountNumericId: account.accountId },
    },
    user.id,
  );

  const response = !saved
    ? backToConnections(origin, META_ERRORS.exchangeFailed)
    : backToConnections(origin, null, accounts.length > 1);
  response.cookies.delete(META_STATE_COOKIE);

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
    url.searchParams.set(META_PICK_ACCOUNT_PARAM, META_PICK_ACCOUNT_VALUE);
  }

  return NextResponse.redirect(url);
}
