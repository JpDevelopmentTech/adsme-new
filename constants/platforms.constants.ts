import type { ComponentType } from "react";
import type { JobPlatform } from "@/domain/entities/job";
import { MetaIcon } from "@/presentation/components/ui/platform-icons/meta-icon";
import { TiktokIcon } from "@/presentation/components/ui/platform-icons/tiktok-icon";
import { YoutubeIcon } from "@/presentation/components/ui/platform-icons/youtube-icon";
import type { PlatformIconProps } from "@/types/ui.types";

interface PlatformMeta {
  label: string;
  /** Abreviatura de la plataforma para rótulos compactos. */
  mono: string;
  /** Color de marca aplicado al icono. */
  color: string;
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
  Icon: ComponentType<PlatformIconProps>;
}

export const PLATFORM_META: Record<JobPlatform, PlatformMeta> = {
  youtube: {
    label: "YouTube",
    mono: "YT",
    color: "#ff5a5f",
    chartColor: "#ff5a5f",
    Icon: YoutubeIcon,
  },
  meta: {
    label: "Meta",
    mono: "M",
    color: "#4f8bff",
    chartColor: "#4f8bff",
    Icon: MetaIcon,
  },
  tiktok: {
    label: "TikTok",
    mono: "TT",
    color: "#2de2e6",
    chartColor: "#2de2e6",
    Icon: TiktokIcon,
  },
};

/** Tono neutro de la parte que aportan los trabajos sin plataforma vinculada. */
export const UNASSIGNED_CHART_COLOR = "#ffffff59";
