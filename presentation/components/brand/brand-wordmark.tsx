import Image from "next/image";
import logo from "@/public/adsme-logo.png";
import { BRAND_NAME } from "@/constants/brand.constants";
import type { BrandWordmarkProps } from "@/types/brand.types";
import { cn } from "@/utils/cn";

/**
 * Logotipo de AdsME. El archivo es blanco sobre transparente, así que sobre las
 * superficies claras del tema se tiñe con `brightness-0` (respeta el canal alfa
 * y deja el trazo en negro); la altura se fija por clase y el ancho lo deduce
 * Next del propio archivo.
 */
export function BrandWordmark({ className }: BrandWordmarkProps) {
  return (
    <Image
      priority
      src={logo}
      alt={BRAND_NAME}
      className={cn("w-auto brightness-0", className ?? "h-7")}
    />
  );
}
