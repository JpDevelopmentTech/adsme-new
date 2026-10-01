/** Sobre el vidrio oscuro el logotipo va en claro; sobre una superficie clara, en tinta. */
export type BrandWordmarkTone = "ink" | "light";

export interface BrandWordmarkProps {
  tone?: BrandWordmarkTone;
  /** Altura del logotipo por clase; el ancho se ajusta solo. */
  className?: string;
}
