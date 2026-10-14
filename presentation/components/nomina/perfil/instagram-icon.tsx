import type { BrandIconProps } from "@/types/nomina-perfil.types";

/** Glifo de Instagram en trazo: cámara redondeada con su lente y su punto. */
export function InstagramIcon({ color, size = 18 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill={color} />
    </svg>
  );
}
