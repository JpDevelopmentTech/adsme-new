import type { SocialNetworkIconProps } from "@/types/nomina-modales-perfil.types";

/** Glifo monocromo de cada red, dibujado en el color recibido. */
export function SocialNetworkIcon({ network, color, size = 16 }: SocialNetworkIconProps) {
  const stroke = { fill: "none", stroke: color, strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="shrink-0">
      {network === "instagram" ? (
        <g {...stroke}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </g>
      ) : null}
      {network === "facebook" ? <path {...stroke} d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> : null}
      {network === "tiktok" ? (
        <path
          fill={color}
          d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
        />
      ) : null}
      {network === "spotify" ? (
        <g {...stroke}>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M8 15.5c2.6-.9 5.4-.7 7.8.6M7.3 12.4c3.1-1.1 6.8-.9 9.6.8M6.8 9.3c3.7-1.3 8.4-1.1 11.6.9" />
        </g>
      ) : null}
      {network === "youtube" ? (
        <g {...stroke}>
          <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </g>
      ) : null}
      {network === "x" ? (
        <path fill={color} d="M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.37l7.18-8.2L2 3h6.34l4.37 5.78L17.75 3zm-1.08 16.2h1.7L7.4 4.73H5.57L16.67 19.2z" />
      ) : null}
    </svg>
  );
}
