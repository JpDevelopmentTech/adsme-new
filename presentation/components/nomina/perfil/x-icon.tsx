import type { BrandIconProps } from "@/types/nomina-perfil.types";

/** Marca de X como texto: el carácter «𝕏» del propio logotipo. */
export function XIcon({ color, size = 18 }: BrandIconProps) {
  return (
    <span aria-hidden className="leading-none" style={{ color, fontSize: size }}>
      𝕏
    </span>
  );
}
