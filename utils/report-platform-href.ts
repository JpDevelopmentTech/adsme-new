import { REPORT_PLATFORM_PARAM } from "@/constants/report-link.constants";
import type { JobPlatform } from "@/domain/entities/job";
import type { RawSearchParams } from "@/utils/parse-client-list-query";

/**
 * Enlace del reporte con una plataforma elegida, o con todas si es `null`.
 * Conserva el resto de parámetros, como el período, para que filtrar por
 * plataforma no devuelva al cliente al lanzamiento entero.
 */
export function reportPlatformHref(
  basePath: string,
  params: RawSearchParams,
  platform: JobPlatform | null,
): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (key !== REPORT_PLATFORM_PARAM && typeof value === "string") query.set(key, value);
  }
  if (platform) query.set(REPORT_PLATFORM_PARAM, platform);

  const search = query.toString();

  return search ? `${basePath}?${search}` : basePath;
}
