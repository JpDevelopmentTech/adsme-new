import Image from "next/image";
import logo from "@/public/adsme-logo.png";
import { BRAND_NAME } from "@/constants/brand.constants";
import type { BrandWordmarkProps } from "@/types/brand.types";
import { cn } from "@/utils/cn";

/**
 * Logotipo de AdsME. El archivo es blanco sobre transparente y en el sistema v3
 * todas las superficies son oscuras, así que por defecto se deja tal cual; con
 * `tone="ink"` se tiñe con `brightness-0` —que respeta el canal alfa y deja el
 * trazo en negro— para el caso raro de una superficie clara. La altura se fija
 * por clase y el ancho lo deduce Next del propio archivo.
 */
export function BrandWordmark({ className, tone = "light" }: BrandWordmarkProps) {
  return (
    <Image
      priority
      src={logo}
      alt={BRAND_NAME}
      className={cn("w-auto", tone === "ink" && "brightness-0", className ?? "h-7")}
    />
  );
}
