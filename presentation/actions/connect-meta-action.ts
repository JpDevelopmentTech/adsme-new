"use server";

import { randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  META_CALLBACK_PATH,
  META_ERRORS,
  META_STATE_COOKIE,
  META_STATE_MAX_AGE_SECONDS,
} from "@/constants/meta-ads.constants";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";
import { buildMetaAuthorizationUrl } from "@/infrastructure/meta/meta-api";
import { resolveOrigin } from "@/utils/resolve-origin";

/**
 * Arranca el OAuth de Meta Ads. Guarda un `state` aleatorio en cookie httpOnly
 * para poder comprobar en la vuelta que la respuesta corresponde a esta petición.
 */
export async function connectMetaAction(): Promise<void> {
  const state = randomBytes(16).toString("base64url");
  const origin = await resolveOrigin(await headers());
  const authorizationUrl = buildMetaAuthorizationUrl(
    state,
    `${origin}${META_CALLBACK_PATH}`,
  );

  if (!authorizationUrl) {
    redirect(`${CONNECTIONS_ROUTE}?error=${encodeURIComponent(META_ERRORS.notConfigured)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(META_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: META_STATE_MAX_AGE_SECONDS,
  });

  redirect(authorizationUrl);
}
