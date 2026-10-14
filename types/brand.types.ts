import type { JobPlatform } from "@/domain/entities/job";

/** Sobre el vidrio oscuro el logotipo va en claro; sobre una superficie clara, en tinta. */
export type BrandWordmarkTone = "ink" | "light";

export interface BrandWordmarkProps {
  tone?: BrandWordmarkTone;
  /** Altura del logotipo por clase; el ancho se ajusta solo. */
  className?: string;
}

/** Logotipo de una plataforma sin fondo, dimensionado por su ancho en px. */
export interface PlatformMarkProps {
  width: number;
}

/** Meta lleva su degradado sobre blanco y en blanco liso sobre fondos oscuros. */
export interface MetaLogoProps extends PlatformMarkProps {
  tone?: "color" | "white";
}

/**
 * `tile`: el logo dentro de su icono de app, cada uno sobre el fondo que su
 * marca aprueba; sirve para identificar una plataforma por sí solo.
 * `mark`: el logo suelto, para ir junto a su nombre sobre el vidrio oscuro.
 */
export type PlatformLogoVariant = "tile" | "mark";

export interface PlatformLogoProps {
  platform: JobPlatform;
  /** Lado del icono en px; en `mark`, el ancho del logo. */
  size?: number;
  variant?: PlatformLogoVariant;
}
