import { SOCIAL_MUTED_COLOR, SOCIAL_NETWORK_META } from "@/constants/nomina-socials.constants";
import { SocialIcon } from "@/presentation/components/nomina/perfil/social-icon";
import type { SocialLinkButtonProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";

const BASE_CLASSES =
  "grid size-9 place-items-center rounded-[11px] border border-border transition-colors focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none";

/**
 * Botón de una red del perfil: con enlace abre la red en otra pestaña con su
 * color de marca; sin él queda en gris atenuado para agregarlo.
 */
export function SocialLinkButton({ link }: SocialLinkButtonProps) {
  const meta = SOCIAL_NETWORK_META[link.network];

  if (link.url) {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener"
        title={`Abrir ${meta.label}`}
        aria-label={`Abrir ${meta.label}`}
        className={cn(BASE_CLASSES, "hover:border-border-strong")}
        style={{ backgroundColor: `${meta.color}14` }}
      >
        <SocialIcon network={link.network} color={meta.color} />
      </a>
    );
  }

  return (
    <button
      type="button"
      title={`Agregar enlace de ${meta.label}`}
      aria-label={`Agregar enlace de ${meta.label}`}
      className={cn(BASE_CLASSES, "cursor-pointer bg-surface opacity-50 hover:opacity-80")}
    >
      <SocialIcon network={link.network} color={SOCIAL_MUTED_COLOR} />
    </button>
  );
}
