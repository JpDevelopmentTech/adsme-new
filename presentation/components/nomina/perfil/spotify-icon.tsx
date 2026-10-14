import type { BrandIconProps } from "@/types/nomina-perfil.types";

/** Glifo de Spotify en trazo: el círculo con sus tres ondas. */
export function SpotifyIcon({ color, size = 18 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 9.5c3-1 6.5-.7 9 .8M8 12.6c2.5-.7 5.3-.4 7.4.8M8.6 15.5c2-.5 4-.3 5.6.6" />
    </svg>
  );
}
