"use server";

import { randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";
import {
  TIKTOK_CALLBACK_PATH,
  TIKTOK_ERRORS,
  TIKTOK_STATE_COOKIE,
  TIKTOK_STATE_MAX_AGE_SECONDS,
} from "@/constants/tiktok-ads.constants";
import { buildTiktokAuthorizationUrl } from "@/infrastructure/tiktok/tiktok-oauth";
import { resolveOrigin } from "@/utils/resolve-origin";

/**
 * Arranca el OAuth de TikTok Ads. Guarda un `state` aleatorio en cookie
 * httpOnly para poder comprobar en la vuelta que la respuesta corresponde a
 * esta petición.
 */
export async function connectTiktokAction(): Promise<void> {
  const state = randomBytes(16).toString("base64url");
  const origin = resolveOrigin(await headers());
  const authorizationUrl = buildTiktokAuthorizationUrl(
    state,
    `${origin}${TIKTOK_CALLBACK_PATH}`,
  );

  if (!authorizationUrl) {
    redirect(
      `${CONNECTIONS_ROUTE}?error=${encodeURIComponent(TIKTOK_ERRORS.notConfigured)}`,
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(TIKTOK_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TIKTOK_STATE_MAX_AGE_SECONDS,
  });

  redirect(authorizationUrl);
}
