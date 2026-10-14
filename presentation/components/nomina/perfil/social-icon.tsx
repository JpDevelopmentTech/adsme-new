import type { ComponentType } from "react";
import type { NominaSocialNetwork } from "@/domain/entities/nomina-social";
import { FacebookIcon } from "@/presentation/components/nomina/perfil/facebook-icon";
import { InstagramIcon } from "@/presentation/components/nomina/perfil/instagram-icon";
import { SpotifyIcon } from "@/presentation/components/nomina/perfil/spotify-icon";
import { TiktokIcon } from "@/presentation/components/nomina/perfil/tiktok-icon";
import { XIcon } from "@/presentation/components/nomina/perfil/x-icon";
import { YoutubeIcon } from "@/presentation/components/nomina/perfil/youtube-icon";
import type { BrandIconProps, SocialIconProps } from "@/types/nomina-perfil.types";

const ICONS: Record<NominaSocialNetwork, ComponentType<BrandIconProps>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  spotify: SpotifyIcon,
  youtube: YoutubeIcon,
  x: XIcon,
};

/** Glifo de la red pedida, en el color indicado. */
export function SocialIcon({ network, color }: SocialIconProps) {
  const Icon = ICONS[network];
  return <Icon color={color} />;
}
