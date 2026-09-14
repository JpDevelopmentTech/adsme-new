import "server-only";

import { SignJWT, jwtVerify } from "jose";
import {
  REPORT_ROUTE_PREFIX,
  REPORT_TOKEN_ALGORITHM,
  REPORT_TOKEN_AUDIENCE,
  REPORT_TOKEN_ISSUER,
} from "@/constants/report-link.constants";
import { REPORT_LINK_ENV } from "@/infrastructure/security/report-token-env";

const secretKey = new TextEncoder().encode(REPORT_LINK_ENV.secret);

/** Contenido del token de un enlace de reporte. */
export interface ReportTokenClaims {
  jobId: string;
  version: number;
}

/**
 * Firma el enlace de un trabajo. La firma HS256 es determinista, así que el
 * mismo trabajo y versión producen siempre el mismo token: el enlace es estable
 * mientras no se regenere.
 *
 * No lleva caducidad a propósito: un reporte compartido debe seguir abriéndose
 * indefinidamente. La revocación se hace subiendo `report_token_version`.
 */
export async function signReportToken(
  claims: ReportTokenClaims,
): Promise<string> {
  return new SignJWT({ v: claims.version })
    .setProtectedHeader({ alg: REPORT_TOKEN_ALGORITHM })
    .setSubject(claims.jobId)
    .setIssuer(REPORT_TOKEN_ISSUER)
    .setAudience(REPORT_TOKEN_AUDIENCE)
    .sign(secretKey);
}

/** Verifica la firma y devuelve las claims, o `null` si el token no es válido. */
export async function verifyReportToken(
  token: string,
): Promise<ReportTokenClaims | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: [REPORT_TOKEN_ALGORITHM],
      issuer: REPORT_TOKEN_ISSUER,
      audience: REPORT_TOKEN_AUDIENCE,
    });

    const version = payload.v;
    if (typeof payload.sub !== "string" || typeof version !== "number") {
      return null;
    }

    return { jobId: payload.sub, version };
  } catch {
    return null;
  }
}

/** URL absoluta que se comparte con el artista, con el código corto. */
export function toReportUrl(code: string): string {
  return `${REPORT_LINK_ENV.appUrl}${REPORT_ROUTE_PREFIX}/${code}`;
}
