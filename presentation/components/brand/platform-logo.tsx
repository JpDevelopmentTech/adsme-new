import { MetaLogo } from "@/presentation/components/brand/meta-logo";
import { TiktokLogo } from "@/presentation/components/brand/tiktok-logo";
import { YoutubeLogo } from "@/presentation/components/brand/youtube-logo";
import type { PlatformLogoProps } from "@/types/brand.types";
import { cn } from "@/utils/cn";

/** Ancho del logo dentro del icono de app, como parte del lado del icono. */
const TILE_LOGO_RATIO = { youtube: 0.64, meta: 0.68, tiktok: 0.5 } as const;

/**
 * Logo oficial de una plataforma. En `tile` va dentro de su icono de app, cada
 * uno sobre el fondo que su guía aprueba: YouTube y Meta sobre blanco, TikTok
 * sobre negro, con un filete para que el negro no se pierda en el vidrio. En
 * `mark` va suelto junto a su nombre; Meta pasa a blanco, que es lo que su guía
 * pide sobre fondos oscuros.
 */
export function PlatformLogo({ platform, size = 24, variant = "tile" }: PlatformLogoProps) {
  if (variant === "mark") {
    if (platform === "youtube") return <YoutubeLogo width={size} />;
    if (platform === "meta") return <MetaLogo width={size} tone="white" />;

    return <TiktokLogo width={size * 0.8} />;
  }

  const logoWidth = Math.round(size * TILE_LOGO_RATIO[platform]);

  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center",
        platform === "tiktok" ? "bg-black ring-1 ring-white/15 ring-inset" : "bg-white",
      )}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.24) }}
    >
      {platform === "youtube" ? <YoutubeLogo width={logoWidth} /> : null}
      {platform === "meta" ? <MetaLogo width={logoWidth} /> : null}
      {platform === "tiktok" ? <TiktokLogo width={logoWidth} /> : null}
    </span>
  );
}
