import type { BrandIconProps } from "@/types/nomina-perfil.types";

/** Glifo de YouTube en trazo: la pantalla redondeada con el botón de play. */
export function YoutubeIcon({ color, size = 18 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" fill={color} />
    </svg>
  );
}
