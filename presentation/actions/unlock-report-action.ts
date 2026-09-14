"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  REPORT_PASSWORD_FIELD,
  REPORT_ROUTE_PREFIX,
  REPORT_SESSION_MAX_AGE_SECONDS,
  reportSessionCookie,
} from "@/constants/report-link.constants";
import { resolveReportLink } from "@/infrastructure/repositories/resolve-report-link";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { getClientIp } from "@/utils/get-client-ip";

/**
 * Comprueba la clave de un reporte protegido. Si acierta, guarda el token en
 * una cookie propia de ese enlace para no volver a pedirla en cada visita; la
 * clave en sí nunca se guarda ni viaja de vuelta al navegador.
 */
export async function unlockReportAction(formData: FormData): Promise<void> {
  const code = String(formData.get("code") ?? "");
  const password = String(formData.get(REPORT_PASSWORD_FIELD) ?? "");
  const target = `${REPORT_ROUTE_PREFIX}/${code}`;

  if (!code) redirect(REPORT_ROUTE_PREFIX);

  const supabase = await createServerSupabaseClient();
  const access = await resolveReportLink(
    supabase,
    code,
    getClientIp(await headers()),
    password,
  );

  if (access.status !== "ok" || !access.token) {
    redirect(`${target}?${REPORT_PASSWORD_FIELD}=error`);
  }

  const store = await cookies();
  store.set(reportSessionCookie(code), access.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: target,
    maxAge: REPORT_SESSION_MAX_AGE_SECONDS,
  });

  redirect(target);
}
