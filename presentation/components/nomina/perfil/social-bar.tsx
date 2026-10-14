import { SOCIAL_NETWORK_ORDER } from "@/constants/nomina-socials.constants";
import { SocialLinkButton } from "@/presentation/components/nomina/perfil/social-link-button";
import type { SocialBarProps } from "@/types/nomina-perfil.types";

/**
 * Barra de redes del perfil en su orden fijo. En el portal solo aparecen las
 * redes que tienen enlace: el artista no puede agregar las que faltan.
 */
export function SocialBar({ socials, isReadOnly = false }: SocialBarProps) {
  const links = SOCIAL_NETWORK_ORDER.map((network) => socials.find((link) => link.network === network) ?? { network });
  const visible = isReadOnly ? links.filter((link) => link.url) : links;
  if (visible.length === 0) return null;

  return (
    <ul aria-label="Redes del artista" className="flex flex-wrap items-center gap-2">
      {visible.map((link) => (
        <li key={link.network}>
          <SocialLinkButton link={link} />
        </li>
      ))}
    </ul>
  );
}
