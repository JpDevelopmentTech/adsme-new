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
   * TikTok usa su cian rebajado en luminosidad en vez de su rosa: pintado junto
   * al rojo de YouTube en áreas contiguas, el rosa es indistinguible.
   */
  chartColor: string;
  Icon: ComponentType<PlatformIconProps>;
}

export const PLATFORM_META: Record<JobPlatform, PlatformMeta> = {
  youtube: {
    label: "YouTube",
    mono: "YT",
    color: "#d90429",
    chartColor: "#d90429",
    Icon: YoutubeIcon,
  },
  meta: {
    label: "Meta",
    mono: "M",
    color: "#0866ff",
    chartColor: "#0866ff",
    Icon: MetaIcon,
  },
  tiktok: {
    label: "TikTok",
    mono: "TT",
    color: "#0b8c99",
    chartColor: "#0b8c99",
    Icon: TiktokIcon,
  },
};

/** Tono neutro de la parte que aportan los trabajos sin plataforma vinculada. */
export const UNASSIGNED_CHART_COLOR = "#8d99ae";
