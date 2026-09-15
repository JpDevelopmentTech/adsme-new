/** Sobre vidrio claro el logotipo va en tinta; sobre el panel indigo, en claro. */
export type BrandWordmarkTone = "ink" | "light";

export interface BrandWordmarkProps {
  tone?: BrandWordmarkTone;
  /** Altura del logotipo por clase; el ancho se ajusta solo. */
  className?: string;
}
