import type { BrandIconProps } from "@/types/nomina-perfil.types";

/** Glifo de Facebook en trazo: la «f» dentro de su círculo. */
export function FacebookIcon({ color, size = 18 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M13.5 21v-8.5h2.5M13.5 12.5V10a2 2 0 0 1 2-2h1M10.5 12.5h3" />
    </svg>
  );
}
