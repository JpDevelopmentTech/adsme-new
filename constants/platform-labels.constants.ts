import type { JobPlatform } from "@/domain/entities/job";
import type { ConnectionPlatform } from "@/domain/entities/connection";

/** Nombre comercial de cada plataforma de pauta, para textos y alertas. */
export const PLATFORM_LABELS: Record<JobPlatform, string> = {
  youtube: "YouTube Ads",
  meta: "Meta Ads",
  tiktok: "TikTok Ads",
};

/** Las tres plataformas en el orden en que las muestra el dashboard. */
export const PLATFORM_ORDER: JobPlatform[] = ["youtube", "meta", "tiktok"];

/**
 * adsme maneja dos vocabularios: dónde se ve el anuncio (`JobPlatform`) y desde
 * qué cuenta se compra (`ConnectionPlatform`). Solo difieren en YouTube, que se
 * pauta desde Google Ads, pero la traducción hace falta en las dos direcciones.
 */
export const CONNECTION_OF_PLATFORM: Record<JobPlatform, ConnectionPlatform> = {
  youtube: "google_ads",
  meta: "meta",
  tiktok: "tiktok",
};

export const PLATFORM_OF_CONNECTION: Record<ConnectionPlatform, JobPlatform> = {
  google_ads: "youtube",
  meta: "meta",
  tiktok: "tiktok",
};
