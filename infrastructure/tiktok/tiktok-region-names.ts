import "server-only";

import {
  TIKTOK_REGION_CATALOG_PATH,
  TIKTOK_REGION_LANGUAGE,
} from "@/constants/tiktok-ads.constants";
import { tiktokGet } from "@/infrastructure/tiktok/tiktok-client";

interface RegionCatalog {
  region_list?: { region_id?: string | number; region_name?: string }[];
}

/**
 * Catálogo de lugares de la cuenta, de id a nombre en español. Hace falta
 * porque el informe de audiencia solo da `province_id`, y una región sin nombre
 * no se puede pintar en el reporte.
 *
 * Se pide una vez por cuenta y sincronización, no por ventana de fechas: el
 * catálogo no cambia entre tramos.
 */
export async function fetchTiktokRegionNames(
  accessToken: string,
  advertiserId: string,
): Promise<Map<string, string>> {
  const catalog = await tiktokGet<RegionCatalog>(
    TIKTOK_REGION_CATALOG_PATH,
    { advertiser_id: advertiserId, language: TIKTOK_REGION_LANGUAGE },
    accessToken,
  );

  const names = new Map<string, string>();

  for (const region of catalog.region_list ?? []) {
    if (region.region_id !== undefined && region.region_name) {
      names.set(String(region.region_id), region.region_name);
    }
  }

  return names;
}
