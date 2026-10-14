import type { JobPlatform } from "@/domain/entities/job";

/**
 * Nombre y color de datos de cada plataforma. El logo no vive aquí: lo pinta
 * `PlatformLogo`, en presentación, para que esta constante no dependa de
 * componentes.
 */
interface PlatformMeta {
  label: string;
  /**
   * Color con el que la plataforma aparece en áreas de datos (barras, rieles,
   * leyendas). Es la única dimensión del producto donde el color ya significa
   * algo antes de leer, así que aquí sí manda el color y no el tono.
   *
   * TikTok usa su cian en vez de su rosa: pintado junto al rojo de YouTube en
   * áreas contiguas, el rosa es indistinguible. Los tres son los del sistema v3,
   * legibles sobre el violeta del fondo.
   */
  chartColor: string;
}

export const PLATFORM_META: Record<JobPlatform, PlatformMeta> = {
  youtube: { label: "YouTube", chartColor: "#ff5a5f" },
  meta: { label: "Meta", chartColor: "#4f8bff" },
  tiktok: { label: "TikTok", chartColor: "#2de2e6" },
};

/** Tono neutro de la parte que aportan los trabajos sin plataforma vinculada. */
export const UNASSIGNED_CHART_COLOR = "#ffffff59";
