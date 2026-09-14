import type { ComponentType } from "react";
import type { JobPlatform } from "@/domain/entities/job";
import { MetaIcon } from "@/presentation/components/ui/platform-icons/meta-icon";
import { TiktokIcon } from "@/presentation/components/ui/platform-icons/tiktok-icon";
import { YoutubeIcon } from "@/presentation/components/ui/platform-icons/youtube-icon";
import type { PlatformIconProps } from "@/types/ui.types";

interface PlatformMeta {
  label: string;
  /** Color de marca aplicado al icono, tal como está en el `.pen`. */
  color: string;
  /**
   * Color de las áreas de datos (barras, rieles, leyendas). El rosa de TikTok
   * es indistinguible del rojo de YouTube cuando se pintan uno junto a otro,
   * así que ahí se usa su cian, que también es color oficial de la marca,
   * rebajado en luminosidad para que se lea sobre las superficies claras.
   */
  chartColor: string;
  Icon: ComponentType<PlatformIconProps>;
}

export const PLATFORM_META: Record<JobPlatform, PlatformMeta> = {
  youtube: { label: "YouTube", color: "#FF3B30", chartColor: "#FF3B30", Icon: YoutubeIcon },
  meta: { label: "Meta", color: "#0866FF", chartColor: "#0866FF", Icon: MetaIcon },
  tiktok: { label: "TikTok", color: "#FE2C55", chartColor: "#0B8C99", Icon: TiktokIcon },
};

/** Color neutro de la parte que aportan los trabajos sin plataforma vinculada. */
export const UNASSIGNED_CHART_COLOR = "#C7CADA";
