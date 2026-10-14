import type { BrandIconProps } from "@/types/nomina-perfil.types";

/** Glifo de TikTok en trazo: la nota con su gancho, en un solo color. */
export function TiktokIcon({ color, size = 18 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.6 2.2 4.4 5 4.8" />
    </svg>
  );
}
