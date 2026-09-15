import Image from "next/image";
import logo from "@/public/adsme-logo.png";
import { BRAND_NAME } from "@/constants/brand.constants";
import type { BrandWordmarkProps } from "@/types/brand.types";
import { cn } from "@/utils/cn";

/**
 * Logotipo de AdsME. El archivo es blanco sobre transparente: sobre superficies
 * claras se tiñe con `brightness-0` —que respeta el canal alfa y deja el trazo
 * en negro— y sobre las oscuras se deja tal cual. La altura se fija por clase y
 * el ancho lo deduce Next del propio archivo.
 */
export function BrandWordmark({ className, tone = "ink" }: BrandWordmarkProps) {
  return (
    <Image
      priority
      src={logo}
      alt={BRAND_NAME}
      className={cn("w-auto", tone === "ink" && "brightness-0", className ?? "h-7")}
    />
  );
}
