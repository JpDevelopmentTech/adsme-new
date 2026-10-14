import type { PlatformMarkProps } from "@/types/brand.types";

/**
 * Icono oficial de YouTube (versión de 2024): la forma roja con el triángulo
 * siempre en blanco, como exige su guía de marca. Trazado tomado del archivo
 * oficial, sin alterar proporciones ni color.
 */
export function YoutubeLogo({ width }: PlatformMarkProps) {
  return (
    <svg width={width} height={(width * 216.02) / 313.23} viewBox="54.08 5.28 313.23 216.02" aria-hidden>
      <path
        fill="#ff0033"
        d="m210.53 221.3s98.13 0 122.47-6.48c13.7-3.67 24.01-14.26 27.63-27.33 6.69-23.98 6.69-74.42 6.69-74.42s0-50.12-6.69-73.88c-3.62-13.39-13.93-23.76-27.63-27.32-24.34-6.59-122.47-6.59-122.47-6.59s-97.9 0-122.13 6.59c-13.49 3.56-24.01 13.93-27.85 27.32-6.47 23.76-6.47 73.88-6.47 73.88s0 50.44 6.47 74.42c3.84 13.07 14.36 23.66 27.85 27.33 24.23 6.48 122.13 6.48 122.13 6.48z"
      />
      <path fill="#ffffff" d="M259.3 113.29 178.29 67.38v91.81z" />
    </svg>
  );
}
